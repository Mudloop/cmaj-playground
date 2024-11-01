import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import { examples } from '../state/examples';
import { COMMON_STYLES } from './common-styles';
import { Playground } from './Playground';
import { library } from "../state/library";
import { ProjectInfo } from "../state/Types";
@customElement('cmaj-examples') export class ExamplePanel extends LitElement {

	@property({ type: Object }) playground!: Playground;
	static styles = css`
		${COMMON_STYLES}
		:host {
			flex-direction: column;
		}
		#examples {
			width: 100%;
			padding: 4px 6px;
			padding-right:14px;
			border: none;
			border-radius: 4px;
			background-color: #333;
			color: inherit;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 -960 960 960' width='18px' fill='%23ffffff66'%3E%3Cpath d='M480-360 280-560h400L480-360Z'/%3E%3C/svg%3E") !important;
			background-repeat: no-repeat;
			background-position: calc(100% + 2px) center;
			background-size:18px;
			outline: none;
			
			letter-spacing: .5px;
			font-size: 9px;
			cursor: pointer;
		}
		
		/*.selected {
			background-color: rgba(226, 180, 97, 0.267) !important;
			outline: 1px solid rgba(226, 180, 97, 0.29);
			outline-offset: -1px;
			border-radius: 2px;
		}
		.selected label {
			opacity: 0.8;
		}
		.selected:hover {
			background-color: rgba(226, 180, 97, 0.3);
		}*/
	`;
	render = () => {
		return html`
			
				<ui-menu>
					<div id="examples" slot="trigger">Examples</div>
					
					<ul>	
						
						${Object.entries(examples).map(([name, url]) => html`
							<li value=${url} class=${this.playground.project?.info.source?.identifier == url ? 'selected' : ''} @pointerdown=${(e: Event) => this.selectExample(url)}>
								${this.projects?.find(p => p.source?.identifier == url)?.modified ? html`•` : ''}
								${name}
							</li>
						`)}
					</ul>
				</ui-menu>
			
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
		if (this.prevProjects != JSON.stringify(this.projects)) {
			this.prevProjects = JSON.stringify(this.projects);
			this.requestUpdate();
		}
	}
	async selectExample(url: string) {
		if (url && url != '') {
			const info = await library.importProject(url);
			if (!info) return;
			if (!await this.playground.loadProject(info?.id)) {

			}
		}
	}
}