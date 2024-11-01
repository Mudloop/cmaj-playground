import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createPatchViewHolder } from './cmaj_api/cmaj-patch-view.js';
import PianoKeyboard from './cmaj_api/cmaj-piano-keyboard.js';
import * as helpers from './cmaj_api/cmaj-audio-worklet-helper.js'
if (!window.customElements.get('cmaj-panel-piano-keyboard')) customElements.define('cmaj-panel-piano-keyboard', PianoKeyboard);

@customElement('patch-preview') export class PreviewComoponents extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}
		main {
			flex: 1;
			position: relative;
		}
		main>* {
			position: absolute !important;
			inset: 0;
		}
		cmaj-panel-piano-keyboard {
			height: 42px;
			flex-shrink: 0;
			display: none;
			justify-content: center;
			align-items: center;
			max-width: 100% !important;
		}
	`;
	audioContext?: AudioContext;
	keyboard!: PianoKeyboard;
	container!: HTMLElement;

	protected async firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		this.keyboard = this.shadowRoot!.querySelector('cmaj-panel-piano-keyboard') as PianoKeyboard;
		this.container = this.shadowRoot!.querySelector('main') as HTMLElement;
		this.audioContext = new AudioContext();
		this.audioContext.suspend();
		window.addEventListener('message', this.handleMessage);
	}

	private handleMessage = (event: MessageEvent<any>) => {
		switch (event.data.type) {
			case 'init': this.init(event.data.manifest, event.data.version, event.data.code); return;
		}
	}

	private async init(manifest: any, version: any, code: string) {
		const connection = new helpers.AudioWorkletPatchConnection(manifest);
		connection.getCmajorVersion = () => version;
		await (connection.initialise({
			CmajorClass: await new Function(`return (${code});`)(),
			audioContext: this.audioContext!,
			workletName: 'cmaj-worklet-processor',
			hostDescription: 'WebAudio',
			rootResourcePath: './',
		}));
		window.addEventListener('mousedown', () => this.startAudioContent(connection), { once: true });
		this.container.appendChild((await createPatchViewHolder(connection)));
		const midiInputEndpointID = this.getMIDIInputEndpointID(connection);
		if (!midiInputEndpointID) return;
		this.keyboard.attachToPatchConnection(connection, midiInputEndpointID);
		this.keyboard.style.display = 'flex';
	}
	createJavascriptWrapperClass = async (code: string) => await new Function(`return (${code});`)()
	getMIDIInputEndpointID = (connection: helpers.AudioWorkletPatchConnection) => connection.inputEndpoints.find((i: any) => i.purpose === 'midi in')?.endpointID
	startAudioContent = (connection: helpers.AudioWorkletPatchConnection) => {
		connection.connectDefaultAudioAndMIDI(this.audioContext!);
		this.audioContext?.resume();
	}
	render = () => html`
		<main></main>
		<cmaj-panel-piano-keyboard></cmaj-panel-piano-keyboard>
	`;
}