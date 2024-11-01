import { customElement, property } from "lit/decorators";
import { css, html, LitElement, PropertyValues } from "lit";
import { COMMON_STYLES } from "./common-styles";
import { Playground } from "./Playground";
import { library } from "../state/library";
import { PatchCompiler } from "../compiler";

@customElement('cmaj-preview') export class Preview extends LitElement {
	entryPoints: string[] = [];
	selectedEntryPoint?: string;
	message: string = '';
	compiler: PatchCompiler = new PatchCompiler;
	iframe!: HTMLIFrameElement;
	loader!: HTMLElement;
	@property({ type: Object }) playground!: Playground;
	static styles = css`
		${COMMON_STYLES}
		:host {
			width: 100%;
			height: calc(100% - 5px);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		header {
			display: flex;
			gap: 10px;
			align-items: center;
			width: 100%;
			padding: 4px;
			flex-shrink: 0;
			flex-grow: 0;
			padding-right: 12px;
		}
		main {
			position: relative;
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		select {
			width: fit-content;
			padding: 4px 8px;
			padding-right: 24px;
			border: none;
			border-radius: 4px;
			background-color: #333;
			color: inherit;
			-webkit-appearance: none;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			font-size: 12px;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 -960 960 960' width='18px' fill='%23ffffff66'%3E%3Cpath d='M480-360 280-560h400L480-360Z'/%3E%3C/svg%3E") !important;
			background-repeat: no-repeat;
			background-position: calc(100% - 2px) center;
			background-size:18px;
			outline: none !important;
		}
		.result {
			width: 100%;
			height: 100%;
			position: relative;
		}
		iframe {
			width: 100%;
			height: 100%;
			border: none;
		}
		.loader-container {
			position: absolute;
			inset: 0;
			pointer-events: all;
			background-color: #20222399;
		}
		ui-icon {
			opacity: 0.5;
			cursor: pointer;
		}
		ui-icon.selected {
			opacity: 1;
		}
		
	`;
	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		this.playground.project!.onFilesChange.add(() => this.refresh());
		this.iframe = this.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
		this.loader = this.shadowRoot!.querySelector('.loader-container') as HTMLElement;
		const select = this.shadowRoot!.querySelector('select') as HTMLSelectElement;
		select.onchange = () => {
			this.selectedEntryPoint = select.value;
			this.refresh();
		}
		this.refresh();
	}
	results: { [key: string]: { url: string, code: string, manifest: any, version: number, hash: string } } = {};
	taskId: number = 0;
	async refresh() {
		this.message = '';
		this.requestUpdate();
		this.loader.classList.remove('hidden');
		const project = this.playground.project!;
		this.entryPoints = (await project.fs.findAll(p => p.path.endsWith('.cmajorpatch'))).map(p => p.path);
		if (!this.selectedEntryPoint || !this.entryPoints.includes(this.selectedEntryPoint)) this.selectedEntryPoint = this.entryPoints[0];
		this.requestUpdate();
		if (this.selectedEntryPoint) {
			this.taskId++;
			const taskId = this.taskId;
			try {
				const files = Object.fromEntries(await Promise.all((await project.fs.findAll(p => p.isFile)).map(async file => [file.path, await project.volume.readFile(file.path)])));
				const previousResult = this.results[this.selectedEntryPoint];
				const result = await this.compiler.serve(files, this.selectedEntryPoint, previousResult);
				if (this.taskId != taskId) return;
				const { url, code, manifest, version } = result;
				this.results[this.selectedEntryPoint] = result;
				this.iframe.src = url;
				this.iframe.onload = () => this.iframe.contentWindow?.postMessage({ type: 'init', code, version, manifest, root: `.`, }, '*');
			} catch (e) {
				console.log('error', e, this.taskId, taskId);
				throw e;
			}
		} else {
			this.message = 'No entry points found';
		}
		this.requestUpdate();
		this.loader.classList.add('hidden');

	}
	render = () => html`
		<header class="${this.entryPoints.length < 2 ? 'hidden' : ''}">
			<select>${this.entryPoints.map(p => html`<option value=${p} ?selected=${p === this.selectedEntryPoint}>${p}</option>`)}</select>
		</header>
		<main>
			${this.message ? html`<div class="message">${this.message}</div>` : ''}
			<div class="result"><iframe allowtransparency="true"></iframe></div>
			<div class="message"></div>
			<div class="loader-container"><ui-loader></ui-loader></div>
		</main>
	`;

}
