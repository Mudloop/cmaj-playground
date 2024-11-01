import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators";

@customElement('flex-splitter') export class FlexSplitter extends LitElement {
	@property({ type: 'string', attribute: true }) attach?: 'prev' | 'next' = 'prev';
	static styles = css`
		:host { display: block; padding: 1px; background-color: #666; }
		dialog, dialog::backdrop { opacity: 0; }
	`;
	render = () => html`<slot></slot><dialog class="drag-dialog"></dialog>`;
	private get container() { return (this.parentNode as ShadowRoot)?.host as HTMLElement ?? this.parentNode as HTMLElement; }
	private get direction() { return this.container?.computedStyleMap().get('flex-direction')?.toString() ?? 'row'; }
	private get cursor() { return this.direction == 'row' ? 'ew-resize' : 'ns-resize' }
	private get panel() { return this.attach == 'next' ? this.nextElementSibling : this.previousElementSibling; }
	protected updated = (_changedProperties: PropertyValues) => this.style.cursor = this.cursor;
	protected firstUpdated = (_changedProperties: PropertyValues) => this.addEventListener('pointerdown', this.startDrag);

	private startDrag = (e: PointerEvent) => {
		if (e.button !== 0 || !(this.panel instanceof HTMLElement)) return;

		const dialog = this.shadowRoot!.querySelector('dialog');
		if (dialog) {
			dialog.style.cursor = this.style.cursor;
			dialog.showModal?.();
			dialog.onclose = () => dialog.showModal?.();
		}

		const direction = this.direction;
		const start = direction === 'row' ? e.clientX : e.clientY;
		const bounds = this.container?.getBoundingClientRect();
		const key = direction === 'row' ? 'width' : 'height';
		const min = (direction === 'row' ? bounds.left : bounds.top) + this.getBoundingClientRect()[key];
		const max = direction === 'row' ? bounds.right : bounds.bottom;

		const pointermove = (e: PointerEvent) => {
			if (!(this.panel instanceof HTMLElement)) return;
			const delta = (direction === 'row' ? e.clientX : e.clientY) - start;
			const position = Math.max(min, Math.min(max, start + delta)) - (direction === 'row' ? bounds.left : bounds.top);
			this.panel!.style.flex = `0 0 ${this.attach === 'prev' ? position : bounds[key] - position}px`;
		};

		document.addEventListener('pointermove', pointermove);
		document.addEventListener('pointerup', () => {
			document.removeEventListener('pointermove', pointermove);
			if (dialog) dialog.onclose = null;
			dialog?.close();
		}, { once: true });

		e.preventDefault();
		e.stopPropagation();
	}


}