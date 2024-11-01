import { ChildPart, html } from 'lit';
import { AsyncDirective, directive, PartInfo } from 'lit/async-directive.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
class PromiseMapper extends AsyncDirective {
	parent?: HTMLElement | ShadowRoot;
	// dragging = false;

	render = (promise: Promise<any> | (() => Promise<any>)) => {
		if (typeof (promise) == 'function') promise = promise();
		Promise.resolve(promise).then((result) => this.setValue(result));
		return html`
			Loading...
		`;
	};
	props?: any[];

}
export const mapper = directive(PromiseMapper);