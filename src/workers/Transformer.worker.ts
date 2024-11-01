import { instantiateFaustModuleFromFile, LibFaust, FaustCompiler } from '@grame/faustwasm/dist/esm/index'

export type TransformRequest = { requestId: number; filename: string; contents: string; };
export type TranformResponse = { requestId: number; contents: string; };
export type TransformErrorResponse = { requestId?: number; description: string; line: number; column: number; };
export type ResponseMessage = { type: string; message?: TranformResponse | TransformErrorResponse; };
export type RequestMessage = { type: string; message: TransformRequest; };

(globalThis as any).window = globalThis;
self.onmessage = async function (event) {
	const manifest = event.data.manifest;
	const url = event.data.url;
	const faustModuleUrl = event.data.faustModuleUrl
	const files = await transform(manifest, url) as Record<string, any>;
	for (let [filename, content] of Object.entries(files)) {
		if (filename.endsWith('.dsp')) {
			if (!content.includes('namespace') && !content.includes('processor')) {
				const faustModule = await instantiateFaustModuleFromFile(faustModuleUrl as any)
				const libFaust = new LibFaust(faustModule as any);
				(globalThis as any).libFaust = libFaust;
				const compiler = new FaustCompiler(libFaust);
				const name = filename.split('/').at(-1)!.split('.')[0].trim();
				const argv = ["-lang cmajor-hybrid -cn " + name + " -o foo.cmajor"];
				const code = content;
				const result = compiler.generateAuxFiles(name, code, argv.join(" "));
				if (result) {
					const result = compiler.fs().readFile('foo.cmajor', { encoding: "utf8" });
					files[filename] = result;
				} else {
					console.log('ooops');
				}
			}
		}
	}
	self.postMessage({ files });

}
async function transform(manifest: any, url: string) {
	const sources = [manifest.source].flat();

	return await new Promise(async (resolve, reject) => {
		if (manifest.sourceTransformer) {
			const transformerUrl = new URL(manifest.sourceTransformer, url).href;
			const results = new Array<string>(sources.length);
			let queued = sources.length;
			(globalThis as any).cmaj_sendMessageToServer = async (message: ResponseMessage) => {
				switch (message.type) {
					case 'ready': {
						for (let i = 0; i < sources.length; i++) {
							const source = sources[i];
							const filename = new URL(source, url).href;
							const content = await fetch(filename).then(response => response.text());
							(globalThis as any).currentView.deliverMessageFromServer({ type: 'transformRequest', message: { requestId: i, filename, contents: content } });
						}
						break;
					}
					case 'transformResponse': {
						if (message.message?.requestId === undefined) {
							console.error('Invalid response', message);
							return;
						}
						results[message.message!.requestId!] = (message.message as TranformResponse).contents;
						queued--;
						if (queued === 0) {
							const files = Object.fromEntries(sources.map((source, i) => [source, results[i]]));
							resolve(files);
							// self.postMessage({ files });
						}
						break;
					}
				}
			};
			const transformer = await import(transformerUrl);
			transformer.default();
		} else {
			const files = Object.fromEntries(await Promise.all(sources.map(async source => {
				const filename = new URL(source, url).href;
				const content = await fetch(filename).then(response => response.text());
				return [source, content];
			})));
			// self.postMessage({ files });
			resolve(files);
		}
	});
}