import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { COMMON_STYLES } from "./common-styles";
import { FileType } from "../state/Types";
import { Playground } from "./Playground";
import { Modals } from "./Modals";
import { MagicDir, MagicFile, MagicFSEntry } from "../util/MagicFS";
import { AsyncDirective, directive } from "lit/async-directive";

@customElement('cmaj-explorer') export class Explorer extends LitElement {


	@property({ type: Object }) playground!: Playground;
	static styles = css`
		${COMMON_STYLES}
		:host {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			height: 100%;
			position: relative;
			background-color: #202223;
		}
		section {
			flex: 1;
			display: flex;
			flex-direction: column;
			position: relative;
		}
		section > ul {
			padding: 0;
			background-color: #33333366;
			flex: 1;
			position: absolute;
			top: 4px;
			width: calc(100% - 8px);
			left: 4px;
			max-height: calc(100% - 8px);

			overflow-y: auto;
		}
		
		ul {
			list-style: none;
			margin: 0;
			padding-left: 18px;
		}
		header {
			display: flex;
			align-items: center;
			padding: 5px;
			gap: 5px;
			cursor: pointer;
		}
		label {
			text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
			pointer-events: none;
			flex: 1;
			opacity: 0.7;
			color: white;
		}
		.close {
			position: relative;
			opacity: 0;
			transform:scale(.75);
		}
		header:hover .close {
			opacity: .5;
			transition: all 0.2s ease;
		}
		li:hover .close:hover {
			opacity: 1;
		}
		nav {
			display: flex;
			gap: 4px;
		}
		nav>* {
			flex-shrink: 0;
			cursor: pointer;
		}
		header:hover {
			background-color: #444;
		}
		.selected>header {
			background-color: rgba(226, 180, 97, 0.15);
		}
		.selected>header>label {
			opacity: 0.8;
		}
		.selected>header:hover {
			background-color: rgba(226, 180, 97, 0.25);
		}
		.highlighted>header {
			background-color: rgba(226, 180, 97, 0.267) !important;
			outline: 1px solid rgba(226, 180, 97, 0.29);
			outline-offset: -1px;
			border-radius: 2px;
		}
		.highlighted>header>label {
			opacity: 1 !important;
		}
		.target {
			outline: 1px dashed #e2b461;
			outline-offset: -1px;
			background-color: rgba(226, 180, 97, 0.1);
		}
		.toggle {
			transition: transform 0.2s;
		}
		.toggle:hover {
			color: white;
		}
		.expanded .toggle {
			transform: rotate(90deg);
		}
		.toggle:after {
			content: '';
			position: absolute;
			inset: -4px;
			background-color: transparent;
		}
	`;
	expanded: Set<string> = new Set();
	selection?: Set<string> = new Set();
	highlighted?: string;
	constructor() {
		super();
		this.addEventListener('dragover', (e: DragEvent) => this.dragOver(e, ''));
		this.addEventListener('dragleave', () => this.dragLeave(''));
	}

	async select(node: MagicFSEntry, e?: PointerEvent) {
		console.log('select', node);
		if (e && e?.button !== 0) return;
		this.highlighted = node.id;
		if (!e?.shiftKey && !e?.metaKey) this.selection?.clear();
		this.selection?.add(node.id);
		if (e?.shiftKey) {
			// const files = await this.playground.project!.getAllFiles();
			// let start = files.findIndex(file => file.id == node.id);
			// let end = files.findIndex(file => file.id == node.id);
			// for (let i = 0; i < files.length; i++) {
			// 	const file = files[i];
			// 	if (this.selected?.has(file.id)) {
			// 		start = Math.min(start, i);
			// 		end = Math.max(end, i);
			// 	}
			// }
			// for (let i = start; i <= end; i++) {
			// 	this.selected?.add(files[i].id);
			// }
		}
		if (!e?.shiftKey && !e?.metaKey && node.isFile) {
			await this.playground.project!.openFile(node.id);
		}
		this.requestUpdate();
	}
	toggle(id: string, e?: Event, forceOpen?: boolean) {
		if (this.expanded.has(id) && !forceOpen) {
			this.expanded.delete(id);
		} else {
			this.expanded.add(id);
		}
		this.requestUpdate();
		e?.stopPropagation();
		e?.preventDefault();
	}

	dragging?: string;
	target?: string;
	startDrag = (e: DragEvent, path: string) => {
		this.dragging = path;
		e.stopPropagation();
	};
	endDrag() {
		if (this.dragging && this.target !== undefined) {
			this.playground.project!.moveFile(this.dragging, this.target);
		}
		this.dragging = undefined;
		this.target = undefined;
		this.requestUpdate();
	}
	timeout: any;
	dragOver(e: DragEvent, dest: string, id?: string) {
		if (this.target !== undefined) {
			e.preventDefault();
		}
		if (this.target?.startsWith(dest)) return;
		if (dest.startsWith(this.dragging ?? '')) return;
		e.preventDefault();
		if (this.target == dest) return;
		clearTimeout(this.timeout);
		if (id) {
			this.timeout = setTimeout(() => {
				this.expanded.add(id);
				this.requestUpdate();
			}, 300);
		}
		this.target = dest;
		this.requestUpdate();
	}
	dragLeave(dest: string) {
		if (this.target == dest) {
			this.target = undefined;
			this.requestUpdate();
			clearTimeout(this.timeout);
		}
	}
	getClasses = (node: MagicFSEntry) => [
		node.isDir ? 'dir' : 'file',
		this.selection?.has(node.id) ? 'selected' : '',
		this.highlighted == node.id ? 'highlighted' : '',
		this.target == node.path ? 'target' : ''
	].join(' ')
	renderNode: any = (node: MagicFSEntry) => html`
		<li
			class="${this.getClasses(node)}"
			draggable="true"
			@dragstart=${(e: DragEvent) => this.startDrag(e, node.path)}
			@dragend=${() => this.endDrag()}
			@dragover=${node.isDir ? (e: DragEvent) => this.dragOver(e, node.path, node.id) : undefined}
			@dragleave=${node.isDir ? () => this.dragLeave(node.path) : undefined}
		>${node.isDir ? this.renderDir(node as MagicDir, this.expanded.has(node.id)) : this.renderFile(node as MagicFile)}</li>
	`;
	renderFile = (file: MagicFile) => html`
		<header @pointerdown=${(e: PointerEvent) => this.select(file, e)}>
			<ui-file-icon .path=${file.name} width="16" height="16"></ui-file-icon>
			<label>${file.name}</label>
			<ui-icon class="close" currentColors icon="close" @pointerdown=${(e: Event) => this.delete(file, e)}></ui-icon>
		</header>
	`;
	renderDir = (dir: MagicDir, expanded: boolean) => html`
		<header @pointerdown=${(e: PointerEvent) => { this.toggle(dir.id, e, true); this.select(dir, e); }} class="${expanded ? 'expanded' : ''}">
			<ui-icon currentColors @pointerdown=${(e: Event) => this.toggle(dir.id, e)} class="toggle" icon="tabler-chevron-right"></ui-icon>
			<label>${dir.name}</label>
			<ui-icon class="close" currentColors icon="close" @pointerdown=${(e: Event) => this.delete(dir, e)}></ui-icon>
		</header>
		${expanded ? html`<ul>${directory(dir, this.renderNode)}</ul>` : ''}
	`;
	async delete(file: MagicFSEntry, e: Event) {
		e.stopPropagation();
		if (!await Modals.confirm('Delete project?', `Are you sure you want to remove '${file.name}'?`)) return;
		await file.unlink();
	}
	render = () => {
		return html`
			<h4>
				<span class="ellipsis">Files</span>
				<nav>
					<ui-icon slot="trigger" icon="tabler-folder-plus" currentStroke @click=${() => this.add(FileType.Dir)}></ui-icon>
					<ui-icon slot="trigger" icon="tabler-file-plus" currentStroke @click=${() => this.add(FileType.File)}></ui-icon>
					
				</nav>
			</h4>
			<section>
				<ul class="${this.target == '' ? 'target' : ''}">${directory(this.playground.project!.fs.root, this.renderNode)}</ul>
			</section>
		`;
	};
	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.playground.onChange.add(async () => {
			this.requestUpdate();
		});
		this.playground.project!.onFilesChange.add(async () => {
			this.requestUpdate();
		});
	}
	async add(type: FileType) {
		const name = await Modals.prompt('Enter name', `Enter a name for the new ${type == FileType.Dir ? 'directory' : 'file'}`);
		if (!name) return;
		let dir: MagicFSEntry | undefined = await this.playground.project!.fs.getById(this.highlighted) ?? this.playground.project!.fs.root;
		if (dir?.isFile) dir = await dir.parent;
		try {
			const entry = type == FileType.Dir ? await (dir as MagicDir).mkdir(name) : await (dir as MagicDir).addFile(name, '');
			if (!entry) throw new Error('Failed to create file');
			this.expanded.add(dir!.id);
			this.select(entry);
			this.requestUpdate();
		} catch (e: any) {
			console.error(e);
			Modals.alert(e.message);
		}
	}
}

class DirRenderer extends AsyncDirective {
	parent?: HTMLElement | ShadowRoot;

	render = (dir: MagicDir, mapper: (node: MagicFSEntry) => void) => {
		if (Array.isArray(dir.children)) return dir.children.map(mapper)
		Promise.resolve(dir.children).then((result) => this.setValue(result.map(mapper)));
		return dir.prevChildren?.map(mapper) ?? html`<ui-loader></ui-loader>`;
	};
	props?: any[];

}
export const directory = directive(DirRenderer);