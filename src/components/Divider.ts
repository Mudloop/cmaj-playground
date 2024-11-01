// import { LitElement, PropertyValues, css, html } from "lit";
// import { customElement, property } from "lit/decorators";


// @customElement('ui-divider') export class Divider extends LitElement {
// 	@property({ type: String }) label: string = '';
// 	static styles = css`
// 		:host {
// 			background-color: red;
// 			position:absolute;
// 			inset: 0;
// 		}
// 	`;
// 	protected firstUpdated(_changedProperties: PropertyValues): void {
// 		this.addEventListener('mouseover', (e: MouseEvent) => {
// 			console.log('mouseover', e);
// 		});
// 		this.addEventListener('pointerup', (e: PointerEvent) => {
// 			console.log('mouseup', e);
// 		});
// 	}
// 	render = () => html`<slot></slot>`;
// }
