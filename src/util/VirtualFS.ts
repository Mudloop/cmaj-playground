export type FileOperationType = 'writeFile' | 'mkdir' | 'unlink' | 'rename';
export type FileOperation = { path: string, oldPath?: string, id: string, type: FileOperationType }
export type VolumeOperationType = 'volumeRemoved' | 'volumeAdded';
export type VolumeOperation = { type: VolumeOperationType }
export type Operation = VolumeOperation | FileOperation;
export type WatcherEvent = { volume: string, operations: Operation[]; timestamp: number };
import { DB, Writer } from "./DB";
import { generateUniqueId } from "./generateUniqueId";
export type FileContents = string | Uint8Array | Blob;
export const sanitizePath = (path: string) => path.split('/').map(p => p.trim()).filter(p => (p || '.') != '.').filter((p, i, a) => p != '..' && a[i + 1] != '..').join('/')
export type FSEntry = {
	path: string;
	type: 'file' | 'dir';
	id: string;
	created: number;
	modified: number;
	size?: number;
	hash?: string;
};

export class VirtualFS {

	private db: DB;
	private watchers: Set<WatcherCallback> = new Set;
	watch = (callback: WatcherCallback) => this.watchers.add(callback);
	unwatch = (callback: WatcherCallback) => this.watchers.delete(callback);
	public volumes: Record<string, Volume> = {};
	public constructor(private dbName = 'VirtualFS') {
		this.db = new DB(dbName);
		this.db.requireStore('volumes', 'id', false);
		this.db.requireIndex('volumes', 'parentVolumeId', { keys: 'parentVolumeId', unique: false });
		this.db.requireStore('entries', 'id', false);
		this.db.requireIndex('entries', '[volume,path]', { keys: ['volume', 'path'], unique: true });
		this.db.requireIndex('entries', 'volume', { keys: 'volume', unique: false });
		this.db.requireIndex('entries', 'path', { keys: 'path', unique: false });
		this.db.requireIndex('entries', '[volume,parentPath]', { keys: ['volume', 'parentPath'], unique: false });
		this.db.requireIndex('entries', 'type', { keys: 'type', unique: false });
		this.db.requireIndex('entries', 'hash', { keys: 'hash', unique: false });
		this.db.requireStore('content', 'hash', false);
		window.addEventListener('storage', event => this.forwardWatcherEvents(event, `${dbName}/change`));
	}
	private forwardWatcherEvents(e: StorageEvent, key: string): any {
		if (e.key !== key || !e.newValue) return;
		const value = JSON.parse(e.newValue) as WatcherEvent;
		this.watchers.forEach(watcher => watcher(value));
		this.volumes[value.volume]?.notifyWatchers(value);
	}
	getVolumes = async (parentVolumeId: string = '') => await this.db.read(['volumes'], async (accessors) => accessors.volumes.find('parentVolumeId', parentVolumeId))
	createVolume = async (id: string, meta: any, parentVolumeId: string = '') => {
		if (parentVolumeId != '' && !await this.getVolume(parentVolumeId)) throw new Error('Parent volume not found')
		await this.db.write(['volumes'], async (accessors) => accessors.volumes.set({ id, meta, parentVolumeId }));
		this.broadcast({ type: 'volumeAdded' }, id)
		return await this.getVolume(id);
	}
	private broadcast(operations: Operation | Operation[], volumeId: string) {
		operations = [operations].flat();
		if (operations.length == 0) return;
		const detail = { operations, timestamp: Date.now(), volume: volumeId };
		this.watchers.forEach(watcher => watcher(detail));
		localStorage.setItem(`${this.dbName}/change`, JSON.stringify(detail))
	}

	getVolume = async (id: string) => {
		if (this.volumes[id]) return this.volumes[id];
		const volume = await this.db.read(['volumes'], async (accessors) => accessors.volumes.get(id));
		if (!volume) throw new Error('Volume not found: ' + id);
		return this.volumes[id] ??= new Volume(volume.id, this.db, this.dbName);
	};
	async deleteVolume(id: string) {
		const volume = await this.getVolume(id);
		await volume.delete();
		delete this.volumes[id];
		this.broadcast({ type: 'volumeRemoved' }, id);
	}
}


type WatcherCallback = (details: WatcherEvent) => void;

type Watcher = {
	callback: WatcherCallback;
	path?: string;
}

export class Volume {


	constructor(public id: string, private db: DB, private dbName: string) { }


	private watchers: Set<Watcher> = new Set;
	notifyWatchers = (detail: WatcherEvent) => this.watchers.forEach(watcher => {
		detail = { ...detail, operations: watcher.path ? detail.operations.filter(op => (op as FileOperation).path?.startsWith(watcher.path ?? '')) : detail.operations };
		return detail.operations.length == 0 ? undefined : watcher.callback(detail);
	})
	watch = (callback: WatcherCallback, path?: string) => this.watchers.add({ callback, path });
	unwatch = (callback: WatcherCallback) => this.watchers.delete([...this.watchers].find(w => w.callback == callback)!);
	private broadcast(operations: Operation | Operation[]) {
		operations = [operations].flat();
		if (operations.length == 0) return;
		const detail = { operations, timestamp: Date.now(), volume: this.id };
		this.notifyWatchers(detail);
		localStorage.setItem(`${this.dbName}/change`, JSON.stringify(detail))
	}
	readFile<T extends FileContents>(inputPath: string): Promise<T> {
		const path = sanitizePath(inputPath);
		return this.db.read(['entries', 'content'], async (accessors) => {
			const file = await accessors.entries.findOne('[volume,path]', [this.id, path]);
			if (!file || file.type !== 'file') throw new Error('File not found: ' + path);
			const contents = await accessors.content.get(file.hash);
			return contents.content;
		});
	}
	readDir(inputPath: string, recursive: boolean = true): Promise<FSEntry[]> {
		const path = sanitizePath(inputPath);
		return this.db.read(['entries'], async (accessors) => {
			if (path != '') {
				const dir = await accessors.entries.findOne('[volume,path]', [this.id, path]);
				if (!dir) throw new Error(`Directory not found: ${path} ${inputPath}`);
				if (dir.type != 'dir') throw new Error('Not a directory');
			}
			const ret: FSEntry[] = [];
			const getFilesInDir = async (parentPath: string) => {
				const entries = await accessors.entries.find('[volume,parentPath]', [this.id, parentPath]);
				ret.push(...entries.map(f => ({ path: f.path, type: f.type, id: f.id, created: f.created, modified: f.modified, size: f.size, hash: f.hash })));
				if (recursive) {
					const subdirs = JSON.parse(JSON.stringify(entries.filter(f => f.type === 'dir')));
					for (const subdir of subdirs) await getFilesInDir(subdir.path);
				}
			};
			await getFilesInDir(path);
			return ret;
		});
	}
	async writeFile(inputPath: string, content: FileContents): Promise<string> {
		const path = sanitizePath(inputPath);
		const parentPath = path.split('/').slice(0, -1).join('/');
		const hash = await this.hashContents(content);
		await this.mkdir(parentPath, true);
		const id = await this.db.write(['entries', 'content'], async (accessors) => {
			const currentFile = await accessors.entries.findOne('[volume,path]', [this.id, path]);
			if (currentFile?.type == 'dir') throw new Error('Cannot write to a directory');
			const id = currentFile?.id ?? generateUniqueId();
			const created = currentFile?.created ?? Date.now();
			accessors.entries.set({ id, type: 'file', volume: this.id, path, parentPath, size: this.getSize(content), created, modified: Date.now(), hash });
			if (currentFile?.hash != hash) {
				if (currentFile) await Volume.removeContentIfNeeded(currentFile.hash, accessors.entries, accessors.content, [currentFile.id]);
				const currentContent = await accessors.content.get(hash);
				if (!currentContent) {
					accessors.content.set({ hash, content: content as FileContents });
				}
			}
			return id as string;
		});
		this.broadcast({ path, type: 'writeFile', id });
		return id;
	}
	static async removeContentIfNeeded(hash: any, entriesAccessor: Writer, contentAccessor: Writer, exceptions: string[]) {
		const entries = (await entriesAccessor.find('hash', hash)).filter(f => !exceptions.includes(f.id));
		if (entries.length == 0) contentAccessor.delete(hash);
	}
	async hashContents(content: FileContents): Promise<string> {
		if (typeof content == 'string') {
			const buffer = new TextEncoder().encode(content);
			const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
			return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
		}
		if (content instanceof Uint8Array) {
			const hashBuffer = await crypto.subtle.digest('SHA-256', content);
			return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
		}
		if (content instanceof Blob) {
			const buffer = await content.arrayBuffer();
			const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
			return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
		}
		throw new Error('Unsupported content type');

	}
	async mkdir(inputPath: string, recursive: boolean = true): Promise<string | undefined> {
		if (inputPath == '') return;
		const path = sanitizePath(inputPath);
		const parts = path.split('/');
		if (parts.length == 0) return;
		const operations: FileOperation[] = [];
		const id = await this.db.write(['entries'], async (accessors) => {
			let ret: string | undefined = undefined;
			do {
				const path = parts.join('/');
				const current = await accessors.entries.findOne('[volume,path]', [this.id, path]);
				if (current?.type === 'file') throw new Error(`Cannot create directory ${path}, file exists`);
				if (!current) {
					const id = generateUniqueId();
					ret ??= id;
					accessors.entries.set({ id: id, type: 'dir', volume: this.id, path: path, parentPath: parts.slice(0, -1).join('/'), created: Date.now(), modified: Date.now() });
					operations.push({ path, type: 'mkdir', id });
				}
				parts.pop();
			} while (parts.length > 0 && recursive);
			return ret;
		});
		this.broadcast(operations);
		return id;
	}
	async exists(inputPath: string): Promise<boolean> {
		return await this.db.read(['entries'], async (accessors) => {
			const path = sanitizePath(inputPath);
			const currentFile = await accessors.entries.findOne('[volume,path]', [this.id, path]);
			return currentFile != null;
		});
	}
	async unlink(inputPath: string): Promise<void> {
		const path = sanitizePath(inputPath);
		const operations: FileOperation[] = [];

		await this.db.write(['entries', 'content'], async (accessors) => {
			const unlink = async (path: string) => {
				const file = await accessors.entries.findOne('[volume,path]', [this.id, path]);
				if (!file) throw new Error('File not found');
				if (file.type === 'dir') {
					const entries = await accessors.entries.find('[volume,parentPath]', [this.id, path]);
					for (const subdir of entries) await unlink(subdir.path);
				} else Volume.removeContentIfNeeded(file.hash, accessors.entries, accessors.content, [file.id])
				accessors.entries.delete(file.id);
				operations.push({ path, type: 'unlink', id: file.id });
			};
			await unlink(path);
		});

		this.broadcast(operations);
	}
	async rename(inputPath: string, newPath: string): Promise<void> {
		const operations: FileOperation[] = [];
		await this.db.write(['entries'], async (accessors) => {
			const path = sanitizePath(inputPath);
			const newpath = sanitizePath(newPath);
			const rename = async (path: string, newPath: string) => {
				const entry = await accessors.entries.findOne('[volume,path]', [this.id, path]);
				if (!entry) throw new Error('File not found');
				if (entry.type === 'dir') {
					const entries = await accessors.entries.find('[volume,parentPath]', [this.id, path]);
					for (const subdir of entries) await rename(subdir.path, newPath + subdir.path.slice(path.length));
				}
				const newParentPath = newPath.split('/').slice(0, -1).join('/');
				accessors.entries.set({ ...entry, path: newPath, parentPath: newParentPath, modified: Date.now() });
				operations.push({ path, oldPath: newPath, type: 'rename', id: entry.id });
			};
			await rename(path, newpath);
		});
		this.broadcast(operations);
	}
	getSize = (content: any) => content.length ?? content.size ?? content.byteLength ?? 0;
	getById = (id: string) => this.db.read(['entries'], async (accessors) => await accessors.entries.get(id))
	close() {
		this.watchers = new Set;
	}
	async delete() {
		await this.db.write(['entries', 'content', 'volumes'], async (accessors) => {
			const entries = await accessors.entries.find('volume', this.id);
			const contents: Record<string, string[]> = {}
			entries.forEach(file => {
				accessors.entries.delete(file.id);
				contents[file.hash] ??= [];
				contents[file.hash].push(file.id);
			});
			for (let hash in contents) await Volume.removeContentIfNeeded(hash, accessors.entries, accessors.content, contents[hash]);
			accessors.volumes.delete(this.id);
		});
	}
}
(window as any).vfs = VirtualFS;
(window as any).sanitizePath = sanitizePath;