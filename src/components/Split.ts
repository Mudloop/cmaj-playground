import { ChildPart, html } from 'lit';
import { AsyncDirective, directive, PartInfo } from 'lit/async-directive.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
class Split extends AsyncDirective {
	parent?: HTMLElement | ShadowRoot;

	primary: Ref<HTMLElement> = createRef();
	divider: Ref<HTMLElement> = createRef();
	container: Ref<HTMLElement> = createRef();
	dialog: Ref<HTMLDialogElement> = createRef();
	data = { primary: ref(this.primary), divider: ref(this.divider), container: ref(this.container), active: false };
	render = (func: (split: any) => any) => html`
		${func(this.data)}
		<style>.drag-dialog::backdrop { opacity: 0; }</style>
		<dialog class="drag-dialog" ${ref(this.dialog)} @close=${() => this.data.active ? this.dialog.value?.showModal() : undefined}></dialog>
	`;
	props?: any[];
	part?: ChildPart;
	update(part: ChildPart, props: any[]) {
		this.props = props;
		this.part = part;
		this.parent = part.parentNode as HTMLElement;
		this.divider.value?.removeEventListener('pointerdown', this.startDrag);
		this.divider.value?.addEventListener('pointerdown', this.startDrag);
		const container = this.getContainerRoot();
		if (container) {
			const containerStyles = Object.fromEntries(container?.computedStyleMap());
			if (containerStyles?.['flex-direction']) {
				const direction = [...containerStyles['flex-direction']][0].toString();
				const cursor = direction == 'row' ? 'ew-resize' : 'ns-resize';
				if (this.dialog.value) {
					this.dialog.value!.style.cursor = cursor;
					this.dialog.value!.style.opacity = '0';
				}
				if (this.divider.value) {
					this.divider.value!.style.cursor = cursor;
				}
			}
		}
		return super.update(part, props);
	}
	startDrag = (e: PointerEvent) => {
		if (e.button != 0) return;
		e.preventDefault();
		e.stopPropagation();
		const container = this.getContainerRoot();
		const containerStyles = Object.fromEntries(container?.computedStyleMap());
		const direction = [...containerStyles['flex-direction']][0].toString();


		const start = direction === 'row' ? e.clientX : e.clientY;
		this.dialog.value!.showModal();
		this.data.active = true;
		this.refresh();
		const pointermove = (e: PointerEvent) => {
			const bounds = this.getBounds();
			const gutterSize = direction === 'row' ? this.divider.value!.getBoundingClientRect().width : this.divider.value!.getBoundingClientRect().height;
			const min = (direction === 'row' ? bounds.left : bounds.top) + gutterSize;
			const max = (direction === 'row' ? bounds.right : bounds.bottom);
			const delta = (direction === 'row' ? e.clientX : e.clientY) - start;
			const position = Math.max(min, Math.min(max, start + delta)) - (direction == 'row' ? bounds.left : bounds.top);
			const primary = this.primary.value;
			const container = this.getContainer();
			if (primary && container) {
				const primaryIndex = [...container.childNodes].indexOf(primary);
				const dividerIndex = [...container.childNodes].indexOf(this.divider.value!);
				const key = direction == 'row' ? 'width' : 'height';
				primary.style.flex = '0 0 ' + (primaryIndex < dividerIndex ? position : (bounds[key] - position)) + 'px'
			}
			this.refresh();
		};
		document.addEventListener('pointermove', pointermove);
		document.addEventListener('pointerup', (() => {
			document.removeEventListener('pointermove', pointermove);
			this.data.active = false;
			this.dialog.value?.close();
			this.refresh();
		}), { once: true });
	}
	private getContainer = () => this.container.value ?? this.parent;
	private getContainerRoot = () => (this.getContainer() as ShadowRoot)?.host as HTMLElement ?? this.getContainer() as HTMLElement;
	private getBounds = () => (this.getContainer() as HTMLElement)?.getBoundingClientRect?.() ?? (this.getContainer() as ShadowRoot)?.host?.getBoundingClientRect?.();

	private refresh() {
		if (this.props) {
			this.setValue((this as any).render(...this.props));
		}
	}
}
export const split = directive(Split);