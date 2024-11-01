import naturalSort from "natural-sort";
import { Volume, FileContents, sanitizePath, WatcherEvent } from "./VirtualFS";
import { Trigger } from "./Trigger";
export abstract class MagicFSEntry {
	public disposed = false;
	public onChange = new Trigger;
	public onDelete = new Trigger;
	constructor(protected fs: MagicFS, public path: string, public id: string) { }
	get name() { return this.path.split('/').at(-1) ?? ''; }
	dispose() {
		this.disposed = true;
		this.onDispose();
		this.onDelete.trigger();
		this.onDelete.dispose();
		this.onChange.dispose();
		return this.id;
	}
	reset() {
		this.onReset();
		this.onChange.trigger();
	}
	rename = (path: string) => this.disposed ? undefined : this.fs.rename(this, path);
	moveTo = (path: string) => this.disposed ? undefined : this.fs.rename(this, path + '/' + this.name);
	unlink = () => this.disposed ? undefined : this.fs.unlink(this);

	abstract isFile: boolean;
	abstract isDir: boolean;
	protected abstract onReset(): void;
	protected abstract onDispose(): void;
	get parent(): Promise<MagicFSEntry | undefined> { return this.fs.get(sanitizePath(this.path + '/..')); }
}
export class MagicDir extends MagicFSEntry {
	isFile: false = false;
	isDir: true = true;
	private _children?: Promise<MagicFSEntry[]> | MagicFSEntry[];
	public prevChildren?: MagicFSEntry[];
	get children(): Promise<MagicFSEntry[]> | MagicFSEntry[] {
		return this.disposed ? Promise.resolve([]) : this._children ??= this.fs.getChildren(this).then(r => this._children = r);
	}
	onReset = () => {
		if (this.disposed) return;
		if (Array.isArray(this._children)) this.prevChildren = this._children;
		delete this._children;
	};
	onDispose = () => this.disposed ? undefined : delete this._children;
	addFile = async (name: string, content: FileContents) => {
		if (this.disposed) return;
		if (await this.get(name)) throw new Error("File exists");
		return this.fs.getById((await this.fs.writeFile(this.path + '/' + name, content)));
	};
	mkdir = async (name: string) => this.disposed ? undefined : this.fs.getById(await this.fs.mkdir(this.path + '/' + name));
	get = async (path: string) => {
		if (this.disposed) return;
		if (path == '') return this;
		let children = await this.children;
		const parts = path.split('/');
		for (let i = 0; i < parts.length - 1; i++) {
			const dir = children.find(f => f.name == parts[i] && f instanceof MagicDir);
			if (!dir?.isDir) return;
			children = await (dir as MagicDir).children;
		}
		return children.find(f => f.name == parts[parts.length - 1]);
	}

}
export class MagicFile extends MagicFSEntry {
	isFile: true = true;
	isDir: false = false;
	private _content?: Promise<FileContents>;
	get content(): Promise<FileContents> {
		return this.disposed ? Promise.resolve('') : this._content ??= this.fs.getContent(this);
	}
	onReset = () => this.disposed ? undefined : delete this._content;
	onDispose = () => this.disposed ? undefined : delete this._content;
	write = (content: FileContents) => this.disposed ? undefined : this.fs.writeFile(this.path, content);
}

export class MagicFS {

	root: MagicDir;
	private _lookup = new Map<String, MagicFSEntry>;
	constructor(private _volume: Volume) {
		this.root = new MagicDir(this, '', '');
		this._lookup.set('', this.root);
		_volume.watch(this._updateFiles);
	}
	private _updateFiles = (detail: WatcherEvent) => {
		for (let item of detail.operations) {
			if (item.type == 'volumeRemoved' || item.type == 'volumeAdded') continue;
			const parentPath = sanitizePath((item as any).path + '/..');
			this._findByPath(parentPath)?.reset();
			switch (item.type) {
				case 'rename': this._findByPath(sanitizePath(item.oldPath! + '/..')!)?.reset(); break;
				case 'unlink': this._lookup.delete(this._lookup.get(item.id)?.dispose() ?? item.id); break;
				case 'writeFile': this._lookup.get(item.id)?.reset(); break;
			}
		}
	}

	private _findByPath = <T extends MagicFSEntry>(path: string) => this._lookup.values().find(entry => entry.path == path) as T;
	get = async (path: string) => this.root.get(path);
	rename = async (entry: MagicFSEntry, path: string) => await this._volume.rename(entry.path, path);
	unlink = async (entry: MagicFSEntry) => await this._volume.unlink(entry.path);
	mkdir = async (path: string) => await this._volume.mkdir(path);
	writeFile = async (path: string, content: FileContents) => await this._volume.writeFile(path, content);

	getChildren = async (parent: MagicDir): Promise<(MagicFSEntry)[]> => {
		return (await this._volume.readDir(parent.path, false)).map(file => {
			if (this._lookup.has(file.id)) {
				const entry = this._lookup.get(file.id)!;
				if (entry.isFile !== (file.type === 'file') || entry.isDir !== (file.type === 'dir')) {
					entry.dispose();
					this._lookup.delete(file.id);
				} else {
					entry.path = file.path;
					return entry;
				}
			}
			const entry = file.type == 'dir' ? new MagicDir(this, file.path, file.id) : new MagicFile(this, file.path, file.id);
			this._lookup.set(file.id, entry);
			return entry;
		}).sort((a, b) => a.isDir && b.isFile ? -1 : naturalSort()(a.name, b.name));
	}
	getContent = async (file: MagicFile) => await this._volume.readFile(file.path)

	async find(predicate: (f: any) => any) {
		const queue: MagicFSEntry[] = [this.root];
		while (queue.length) {
			const current = queue.shift()!;
			if (await predicate(current)) return current;
			if (current instanceof MagicDir) queue.push(...await current.children);
		}
	}
	async findAll(predicate: (f: any) => any) {
		const ret: MagicFSEntry[] = [];
		const queue: MagicFSEntry[] = [this.root];
		while (queue.length) {
			const current = queue.shift()!;
			if (await predicate(current)) ret.push(current);
			if (current instanceof MagicDir) queue.push(...await current.children);
		}
		return ret;
	}
	async getById(id?: string) {
		if (!id) return;
		if (this._lookup.has(id)) return this._lookup.get(id);
		const file = await this._volume.getById(id);
		if (!file) return;
		if (this._lookup.has(id)) return this._lookup.get(id);
		const entry = file.type == 'dir' ? new MagicDir(this, file.path, file.id) : new MagicFile(this, file.path, file.id);
		this._lookup.set(file.id, entry);
		return entry;
	}
	close() {
		this._volume.unwatch(this._updateFiles);
		this._volume.close();
	}
}