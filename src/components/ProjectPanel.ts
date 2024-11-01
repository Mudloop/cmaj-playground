import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { examples } from '../state/examples';
import { COMMON_STYLES } from './common-styles';
import { Playground } from './Playground';
import { library } from "../state/library";
import { ProjectInfo } from "../state/Types";
import { Modals } from "./Modals";

@customElement('cmaj-projects') export class ProjectPanel extends LitElement {


	@property({ type: Object }) playground!: Playground;
	static styles = css`
		${COMMON_STYLES}
		:host {
			flex-direction: column;
			background-color: #202223;
		}
		
		ul {
			background-color: #33333366;
			list-style: none;
			padding: 0;
			margin: 0;
			overflow-y: auto;
			height: 100%;
			max-height: 150px;
		}
		li {
			padding: 4px 8px;
			cursor: pointer;
			display: flex;
		}

		li:hover {
			background-color: #444;
		}
		.selected {
			background-color: rgba(226, 180, 97, 0.267) !important;
			outline: 1px solid rgba(226, 180, 97, 0.29);
			outline-offset: -1px;
			border-radius: 2px;
		}
		label {
			flex: 1;
			text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
			pointer-events: none;
		}
		.selected label {
			opacity: 1;
			color:white;
		}
		.selected:hover {
			background-color: rgba(226, 180, 97, 0.3);
		}
		li>span {
			background-color: #d3cd9f;
			padding: 2px 4px;
			font-size: 7.5px;
			border-radius: 4px;
			margin-right: 4px;
			color: black;
			text-transform: uppercase;
			font-weight: 900;
			letter-spacing: 1px;
			display: flex;
			align-items: center;
		}
		li>span.modified {
			background-color: #e2b461;
		}
		.close {
			position: relative;
			opacity: 0;
			transform:scale(.75);
		}
		li:hover .close {
			opacity: .5;
			transition: all 0.2s ease;
		}
		li:hover .close:hover {
			opacity: 1;
		}
		nav {
			display: flex;
			align-items: center;
			gap: 4px;
		}
		ui-icon {
			position: relative;
		}
		ui-icon:after {
			content: '';
			position: absolute;
			inset: -4px;
			background-color: transparent;
		}
	`;
	render = () => {
		return html`
			
			<h4>
				<span class="ellipsis">Projects</span>
				<nav>
					<cmaj-examples .playground=${this.playground}></cmaj-examples>
					<ui-menu>
						<ui-icon slot="trigger" icon="tabler-plus" currentColors></ui-icon>
						
						<ul>
							
							<li @click=${() => this.newProject('default')}>Without Demo UI</li>
							<li @click=${() => this.newProject('ui')}>With Demo UI</li>
							
							<li @click=${() => this.importURL()}>Import From URL</li>
							<li>Upload Files</li>
						</ul>
					</ui-menu>
				</nav>
				
			</h4>
			
			${this.projects?.length ?? 0 > 0 ? html`
				<section>
					<ul>
						${this.projects?.map(project => html`
							<li
								class="${project.id == this.playground.project?.info.id ? 'selected' : ''}"
								@click=${() => this.playground.loadProject(project.id)}
							>
								${this.isExample(project) ? html`<span class="${project.modified ? 'modified' : ''}">Example</span> ${project.modified ? '• ' : ''}` : ''}
								<label>${project.name}</label>
								<ui-icon class="close" currentColors icon="close" @click=${(e: Event) => this.deleteProject(project, e)}></ui-icon>
							</li>
						`)}
					</ul>
				</section>
			` : ''}
			
		`;
	};
	projects?: ProjectInfo[];
	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.playground.onChange.add(() => this.requestUpdate());
	}
	prevProjects?: string;
	protected async updated(_changedProperties: PropertyValues) {
		super.updated(_changedProperties);
		this.projects = await library.listProjects();

		this.projects.sort((a, b) => this.isExample(a) ? 1 : -1);
		if (this.prevProjects != JSON.stringify(this.projects)) {
			this.prevProjects = JSON.stringify(this.projects);
			this.requestUpdate();
		}
	}
	isExample = (project: ProjectInfo) => Object.values(examples).map(url => import.meta.resolve(url)).includes(project.source?.identifier!)
	async newProject(template: string) {
		const name = await Modals.prompt('Enter name', 'Enter a name for the new project');
		if (name) {
			const project = await library.createProject(name, template);
			if (project) this.playground.loadProject(project.id);
		}
	}

	async deleteProject(project: ProjectInfo, e?: Event) {
		e?.preventDefault();
		e?.stopPropagation();
		if (project.modified || !this.isExample(project)) {
			if (!await Modals.confirm('Delete project?', `Are you sure you want to remove the project '${project.name}'?`)) return;
		}
		await library.deleteProject(project.id);
		if (project.id == this.playground.project?.info.id) {
			this.playground.closeProject()
		}
	}
	async importURL() {
		const url = await Modals.prompt('Enter URL', 'Enter the URL of the project to import');
		if (!url) return
		const info = await library.importProject(url);
		if (!info) return;
		if (!await this.playground.loadProject(info?.id)) {

		}
	}

}