import { css, html, render, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import monaco from '../../artifacts/monaco';
import monacoCSS from "../../artifacts/monaco/monaco.css" with { type: 'text' };
import { unsafeHTML } from "lit/directives/unsafe-html";
import { FileEditorBase } from "./FileEditorBase";

@customElement("cmaj-monaco-editor") export class MonacoEditor extends FileEditorBase {

	static additionalExtensions: Record<string, string> = {};
	static addExtension(ext: string, language: string) { this.additionalExtensions[ext] = language; }
	static styles = css`
		${FileEditorBase.styles}
		${unsafeCSS(monacoCSS)}
		:host {
			overflow: hidden;
			background-color: #232627;
			position: relative;
			height: 100%;
			width: 100%;
		}
		#editor {
			position: absolute;
			inset: 0;
		}
	`;
	private monaco?: monaco.editor.IStandaloneCodeEditor;
	private observer?: ResizeObserver;
	render = () => html`<div id="editor" class="editor"></div>`

	protected async onFirstContentLoad() {
		this.setAttribute('tabindex', '0');

		const content = await this.file.content as string;
		const editorContainer = this.shadowRoot!.getElementById('editor')!;
		let lang: string | undefined = MonacoEditor.getLanguage(this.file.path) ?? 'plaintext';
		monaco.editor.defineTheme("vs-dark", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				'editor.background': "#232627",
			}
		});
		console.log(content.length);
		if (content.length > 1000000) {
			lang = undefined;//'plaintext';
		}
		this.monaco = monaco.editor.create(editorContainer, {
			value: content,
			language: lang,
			fontSize: 11,
			theme: 'vs-dark',
			tabSize: 4,
			insertSpaces: false,
			useTabStops: true
		});

		this.monaco.onDidChangeModelContent(() => this.setEditorContent(this.monaco!.getValue()));
		this.observer = new ResizeObserver(() => {
			return this.monaco?.layout();
		});
		this.observer.observe(editorContainer);
		window.addEventListener('resize', () => this.monaco?.layout());
	}
	static getLanguage(path: string): string | undefined {
		if (!path) return;
		const extension = path.split('.').pop();
		if (!extension) return;

		let languages = monaco.languages.getLanguages();
		let language = languages.find(lang => lang.extensions?.includes('.' + extension) || lang.extensions?.includes(extension));
		if (!language) {
			if (MonacoEditor.additionalExtensions[extension]) return MonacoEditor.additionalExtensions[extension];
			return;
		}
		return language.id;
	}
	onDispose() {
		this.monaco?.dispose();
		this.observer?.disconnect();
		delete this.observer;
		delete this.monaco;
	}


	updated(changedProperties: Map<string | number | symbol, unknown>) {
		if (changedProperties.has('file') && this.monaco) {
			// if (this.monaco.getValue() !== this.contents) this.monaco.setValue(this.contents ?? '');
		}
		this.monaco?.layout();
	}
	onContentUpdate() {
		this.monaco?.setValue(this.editorContent as string ?? '');
	}

}

render(html`<style>${unsafeHTML(monacoCSS)}<style>`, document.body);

