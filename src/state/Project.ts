import { ProjectInfo, Manifest } from "./Types";
import { Trigger } from "../util/Trigger";
import { Librarian } from "./Librarian";
import { Modals } from "../components/Modals";
import { Volume, sanitizePath } from "../util/VirtualFS";
import { MagicFile, MagicFS } from "../util/MagicFS";
import { FileEditorBase } from "../components/FileEditorBase";
import { isBinary, mtype } from "../util";
import { FileViewer } from "../components/FileViewer";
import { MonacoEditor } from "../components";

export class Project {
	editors: FileEditorBase[] = [];
	editorsOrder: FileEditorBase[] = [];
	onChange: Trigger = new Trigger();
	onFilesChange: Trigger = new Trigger();
	fs: MagicFS;
	constructor(public info: ProjectInfo, public volume: Volume, private librarian: Librarian) {
		this.fs = new MagicFS(volume);
		volume.watch(async (details) => {
			for (let detail of details.operations) {
				if (detail.type == 'volumeRemoved') {
					console.log('Volume removed');
					document.location = document.location;
				}
				if (detail.type == 'unlink') {
					const id = detail.id;
					this.closeFile(id);
				}
			}
			this.onFilesChange.trigger();
		});
		this.getBuildableFiles();
	}
	focusEditor(editor: FileEditorBase) {
		this.editorsOrder = this.editorsOrder.filter(e => e != editor);
		this.editorsOrder.push(editor);
		this.onChange.trigger();
	}
	async getBuildableFiles() {
		const builders = Object.values(this.librarian.builders);
		const ret = (await this.fs.findAll(p => builders.some(builder => builder.test(p.path))));
		console.log(ret);
	}
	async getDefaultFile() {
		const cmajorpatch = await this.fs.find(f => f.path.endsWith('.cmajorpatch'));
		if (!cmajorpatch) return false;
		const content = await this.volume.readFile<string>(cmajorpatch.path);
		const manifest: Manifest = JSON.parse(content);
		const sources = [manifest.source].flat();
		if (sources.length > 0) {
			let path = sources[0];
			if (path?.startsWith('./')) path = path.substring(2);
			return (await this.fs.get(path!))?.id;
		}
		return cmajorpatch.id;
	}
	private createEditor = (file: MagicFile) => {
		const ret = isBinary(mtype(file.path)) ? new FileViewer(file) : new MonacoEditor(file);
		ret.changeTrigger.add(() => this.onChange.trigger());
		return ret;
	}
	async openFile(id: string) {
		const currentIndex = this.editorsOrder.findIndex(editor => editor.file.id == id);
		if (currentIndex != -1) {
			const editorFile = this.editorsOrder[currentIndex];
			this.editorsOrder.splice(currentIndex, 1);
			this.editorsOrder.push(editorFile);
		} else {
			const file = await this.fs.getById(id) as MagicFile;
			if (!file?.isFile) return;
			const editorFile = this.createEditor(file);
			this.editors.push(editorFile);
			this.editorsOrder.push(editorFile);
		}
		this.onChange.trigger();
	}
	async closeFile(id: string) {
		const editor = this.editorsOrder.find(editor => editor.file.id == id);

		if (editor?.isDirty && !await Modals.confirm('Unsaved changes', `You have unsaved changes.\n\nAre you sure you want to close this file?`)) return false;

		this.editorsOrder = this.editorsOrder.filter(editor => editor.file.id != id);
		this.editors = this.editors.filter(editor => editor.file.id != id);
		this.onChange.trigger();
		return true;
	}
	async close() {
		const dirty = this.editors.filter(editor => editor.isDirty).length;
		if (dirty && !await Modals.confirm('Unsaved changes', `You have unsaved changes.\n\nAre you sure you want to close this project?`)) return false;
		for (let editor of this.editors) editor.dispose();
		this.editors = [];
		this.editorsOrder = [];
		this.fs.close();
		return true;
	}
	moveFile = (path: string, targetPath: string) => this.volume.rename(path = sanitizePath(path), (sanitizePath(targetPath) + '/' + path.split('/').at(-1)))
	async createFile(path: string, content: string) {
		await this.volume.writeFile(path, content);
		this.onChange.trigger();
		this.onFilesChange.trigger();
	}
}