import logo from '../../assets/img/logo.png' with { type: 'file' };
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { library } from '../state/library';
import { Project } from '../state/Project';
import { FileEditorBase } from './FileEditorBase';
import { COMMON_STYLES } from './common-styles';
import { Trigger } from '../util';
import { keyed } from 'lit/directives/keyed';
import { Modals } from './Modals';
export enum Layout { Horizontal = 'horizontal', Vertical = 'vertical' }

@customElement('cmaj-playground') export class Playground extends LitElement {


	@property({ type: String, attribute: true }) layout: Layout = Layout.Horizontal;
	@property({ type: String }) size?: 'sm' | 'lg';

	enlarged: any;
	embedded = window.top != window;
	project?: Project; observer?: ResizeObserver;
	onChange: Trigger = new Trigger();

	static styles = css`
		${COMMON_STYLES}
		:host {
			width: 100%;
			height: 100%;
			position: relative;
			background-color: #202223;
			display: flex;
			flex-direction: row;
			color: #b3b0aa;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			font-size: 12px;
		}
		* {
			box-sizing: border-box;
			user-select: none;
		}
		.logo {
			display: flex;
			padding: 20px 8px;
			gap: 8px;
			position: relative;
			width: fit-content;
		}
		.logo img {
			width: 100%;
			max-width: 150px;
			min-width: 150px;
			height: auto;
			
			opacity: .65;
		}
		.logo span {
			background-color: #fff;
			opacity: .8;
			padding: 2px 4px;
			font-size: 7px;
			border-radius: 4px;
			margin-right: 4px;
			color: black;
			text-transform: uppercase;
			font-weight: 900;
			letter-spacing: 1px;
			display: flex;
			align-items: center;
			align-self: start;
			position: absolute;
			right: 0;
			top: 17px;
		}
		#editors>*:not(:last-child) { display: none; }
		#editors { flex: 1; }
		header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		.actions {
			display: flex;
			gap: 4px;
			align-items: center;
			padding: 0 8px;
		}
		ui-icon {
			cursor: pointer;
			opacity: .55;
			position: relative;
		}
		ui-icon:after {
			content: '';
			position: absolute;
			inset: -4px;
			background-color: transparent;
		}
		ui-icon:hover { opacity: .8; }
		ui-icon.selected { opacity: 1; }
		:host([preview-mode]) #play { opacity: 1; }
		:host(:not([preview-mode])) #edit { opacity: 1; }
		:host([layout="vertical"]) #split-bottom { opacity: 1; }
		:host(:not([layout="vertical"])) #split-right { opacity: 1; }
		:host([size="sm"]) #split-bottom { display: none; }
		:host([size="sm"]) #split-right { display: none; }
		:host([size="lg"]) #play { display: none; }
		:host([size="lg"]) .actions-left { display: none; }
		:host([size="lg"]) #edit { display: none; }
		#editor-split { position: relative; }
		
		
		.none {
			background-color: #191b1b;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			color: #b3b0aa;
			height: 100%;
		}
		#sidebar {
			width: 200px;
			overflow: hidden;
			display: flex;
			flex-direction: column;
		}

		.gutter {
			width: 5px;
			position: relative;
		}
		.gutter::after {
			content: '';
			inset: 1px;
			opacity: 0;
			background-color: #e2b461;
			position: absolute;
		}
		#content {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		#content-split {
			flex: 1;
			display: flex;
			flex-direction: row;
			overflow: hidden;
		}
		:host([layout="vertical"]) #content-split { flex-direction: column; }
		:host(:not([layout="vertical"])) #preview { width: 30%;	}
		:host([layout="vertical"]) #preview { height: 30%; }
		flex-splitter {
			position: relative;
			background-color: transparent;
		}
		flex-splitter::after {
			position: absolute;
			content: '';
			inset: -4px;
			z-index: 1000;
		}
		flex-splitter:hover {
			background-color: #e2b461;
			transition: all 0.2s ease .1s;
		}
	`;

	connectedCallback(): void {
		super.connectedCallback();
		this.observer ??= new ResizeObserver(() => this.checkSize());
		this.observer?.observe(this);
		window.addEventListener('resize', this.checkSize);
		if (this.embedded) this.setAttribute('embedded', '');
	}

	protected async firstUpdated(_changedProperties: PropertyValues) {
		library.vfs.watch((detail) => {
			this.onChange.trigger();
			return this.requestUpdate();
		});
		library.volume.watch((detail) => {
			this.onChange.trigger();
			return this.requestUpdate();
		});
		Modals.root = this.shadowRoot!;
		this.setAttribute('layout', this.layout);
		await this.loadProject();
		this.requestUpdate();
	}

	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has('layout')) {
			//this.setAttribute('layout', this.layout);
			const splitter = this.shadowRoot!.getElementById('content-splitter') as LitElement;
			splitter?.requestUpdate();
		}
	}

	private checkSize = () => this.setAttribute('size', (this.getBoundingClientRect()).width < 1024 ? 'sm' : 'lg');
	private requestEnlargements() { this.requestFullscreen(); }

	// async closeFile(id: string) {
	// 	if (await this.project!.closeFile(id)) {
	// 		this.editors[id].dispose();
	// 		delete this.editors[id];
	// 		this.requestUpdate();
	// 	}
	// }

	async loadProject(id?: string) {
		if (id && id == this.project?.info.id) return;
		if (this.project && !await this.project.close()) {
			this.requestUpdate();
			return false;
		}
		// for (let editor of Object.values(this.editors)) editor.dispose();
		// this.editors = {};
		this.project = await library.openProject(id);
		this.project.onChange.add(() => {
			this.requestUpdate();
			this.onChange.trigger();
		});
		const defaultFile = await this.project.getDefaultFile();
		if (defaultFile) await this.project.openFile(defaultFile);
		this.onChange.trigger();
		this.requestUpdate();
		return true;
	}
	render = () => this.project ? this.renderUI() : html`<ui-loader></ui-loader>`;
	private renderUI = () => html`
		<div id="sidebar">
			<div class="logo">
				<img src="${new URL(logo, import.meta.url)}">
				<span>BETA</span>
			</div>
			<cmaj-projects .playground=${this}></cmaj-projects>
			${keyed(this.project!.info.id, html`<cmaj-explorer .playground=${this}></cmaj-explorer>`)}
		</div>
		<flex-splitter attach="prev"></flex-splitter>
		<div id="content">
			<header>
				<div class="actions actions-left">
					<ui-icon icon="menu" @click=${() => (this.shadowRoot!.querySelector('.drawer-overview') as any)?.show()}></ui-icon>
				</div>
				<cmaj-tabs .playground=${this}></cmaj-tabs>
				<div class="actions">
					<ui-icon width=20 height=20 id="split-bottom" icon="split-bottom" currentColors @click=${() => this.setAttribute('layout', Layout.Vertical)}></ui-icon>
					<ui-icon width=20 height=20 id="split-right" icon="split-right" currentColors @click=${() => this.setAttribute('layout', Layout.Horizontal)}></ui-icon>
					<ui-icon width=20 height=20 id="edit" icon="edit" currentColors @click=${() => this.removeAttribute('preview-mode')}></ui-icon>
					<ui-icon width=20 height=20 id="play" icon="play" currentColors @click=${() => this.setAttribute('preview-mode', '')}></ui-icon>
					${this.embedded && this.enlarged ? html`<ui-icon width=20 height=20 currentColors class="selected" icon="shrink" @click=${(e: any) => this.requestEnlargements()}></ui-icon>` : ''}
					${this.embedded && !this.enlarged ? html`<ui-icon width=20 height=20 currentColors icon="enlarge" @click=${(e: any) => window.postMessage({ type: 'enlarge' }, '*')}></ui-icon>` : ''}
				</div>
			</header>
			<div id="content-split">
				<div id="editors" style="overflow: hidden;">
					<div class="none">Open a file to start coding</div>
					${this.project!.editorsOrder}
				</div>
				<flex-splitter id="content-splitter" attach="next"></flex-splitter>
				<div id="preview" style="display: flex; overflow: hidden;">${keyed(this.project!.info.id, html`<cmaj-preview .playground=${this}></cmaj-preview>`)}</div>
			</div>
		</div>
	`;
	closeProject() {
		// delete this.project;
		this.loadProject();
	}
	async close(editor: FileEditorBase) {
		if (await this.project?.closeFile(editor.file.id)) {
			this.requestUpdate();
		}
	}
}