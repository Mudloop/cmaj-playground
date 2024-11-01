import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";

@customElement('ui-menu') export class Menu extends LitElement {
	static styles = css`
		:host {
			display: block;
		}
		.trigger {
			cursor: pointer;
		}
		dialog {
			z-index: 1000;
			margin: 0;
			transform: unset;
			outline: none !important;
			padding: 0;
			background: none;
			border: none;
			overflow: visible;
		}
		dialog::backdrop {
			backdrop-filter: blur(2px);
		}
	`;
	render = () => html`
		<div class="trigger"><slot name="trigger"></slot></div>
		<dialog>
			<slot></slot>
		</dialog>
	`;
	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.onpointerdown = this.open;
		const dialog = this.shadowRoot!.querySelector('dialog')!;
		dialog.onclick = () => dialog?.close();
		dialog.onclose = () => this.visible = false;
	}
	visible = false;
	open = () => {
		(this.shadowRoot!.querySelector('dialog')!).showModal();
		this.visible = true;
		this.updatePosition();
	}

	updatePosition = () => {
		if (!this.visible) return;
		const dialog = this.shadowRoot!.querySelector('dialog')!;
		const bounds = this.getBoundingClientRect();
		dialog.style.left = bounds.left + 'px';
		dialog.style.top = bounds.bottom + 'px';
		requestAnimationFrame(this.updatePosition)
	}
}