self.MonacoEnvironment = {
	getWorkerUrl: (_moduleId, label) => {
		switch (label) {
			case 'json': return new URL('./monaco/monaco.json.worker.js', import.meta.url).href;
			case 'css': case 'scss': case 'less': return new URL('./monaco/monaco.css.worker.js', import.meta.url).href;
			case 'html': case 'handlebars': case 'razor': return new URL('./monaco/monaco.html.worker.js', import.meta.url).href;
			case 'typescript': case 'javascript': return new URL('./monaco/monaco.ts.worker.js', import.meta.url).href;
		}
		return new URL('./monaco/monaco.editor.worker.js', import.meta.url).href;
	}
};