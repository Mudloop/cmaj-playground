import { CompilationResult, File, Files, Manifest, ServedCompilationResult } from "./Types.js";
import compilerSource from '../../artifacts/workers/compiler.worker.js' with { type: 'text' };
import transformerSource from '../../artifacts/workers/transformer.worker.js' with { type: 'text' };
import wasmPath from '../../assets/wasm/cmaj-compiler-wasm.wasm' with { type: 'file' };
import { PatchService } from './PatchService.js';
import logoSVG from './cmaj_api/cmajor-logo.svg' with { type: 'text' };
import templateHTML from '../../artifacts/template/template.html' with { type: 'text' };
import templateSrc from '../../artifacts/template/template.js' with { type: 'text' };
import faustModuleUrl from '@grame/faustwasm/libfaust-wasm/libfaust-wasm.js' with {type: 'file'}
import '@grame/faustwasm/libfaust-wasm/libfaust-wasm.wasm' with {type: 'file'}
import '@grame/faustwasm/libfaust-wasm/libfaust-wasm.data' with {type: 'file'}
export class PatchCompiler {
	cancellers: (() => void)[] = [];
	constructor(private wasmURL: URL = new URL(wasmPath, import.meta.url)) { }
	async serve(files: Files, manifestPath: string, prev?: ServedCompilationResult): Promise<ServedCompilationResult> {
		this.cancellers.forEach(c => c());
		let cancelled = false;
		this.cancellers = [() => cancelled = true];
		files = Object.fromEntries(Object.entries(files).filter(([path]) => !path.endsWith('.cmajorpatch') || path === manifestPath));
		files['index.html'] = templateHTML;
		files['template.js'] = templateSrc;
		files['assets/cmajor-logo.svg'] = logoSVG;

		const url = await PatchService.createServer(files);
		if (cancelled) throw 'cancelled';
		const manifest = JSON.parse(files[manifestPath]! as string) as Manifest;
		const manifestURL = new URL(manifestPath, url).href;
		if (manifest.sourceTransformer || true) await PatchService.updateFiles(await this.transform(url, manifest), url);
		if (cancelled) throw 'cancelled';
		const hash = await this.hashFiles(files, manifest, true);
		if (hash == prev?.hash) return prev;
		if (cancelled) throw 'cancelled';
		const { code, version } = await this.compile(manifestURL);
		return { code, version, manifest, url, hash };

	}
	async hashFiles(files: Files, manifest: Manifest, relevantFilesOnly: boolean) {
		let sources: File[];
		if (relevantFilesOnly) {
			sources = [manifest.source!].flat().map(s => files[s]);
			sources.push(JSON.stringify(manifest));
		} else {
			sources = Object.values(files);
		}
		return await this.hashString(sources.join(''));
	}
	async hashString(str: string) {
		const buffer = new TextEncoder().encode(str);
		const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
		return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
	}
	private async transform(url: string, manifest: Manifest) {
		const workerURL = URL.createObjectURL(new Blob([transformerSource], { type: 'application/javascript' }));
		const worker = new Worker(workerURL);
		try {
			worker.postMessage({ action: 'transform', url, manifest, faustModuleUrl: import.meta.resolve(faustModuleUrl as any) });
			return await new Promise<Files>((resolve, reject) => worker.onmessage = (event) => event.data.error ? reject(event.data.error) : resolve(event.data.files));
		} catch (e) { throw e; } finally {
			worker.terminate();
			URL.revokeObjectURL(workerURL);
		}
	}
	private async compile(url: string) {
		const workerURL = URL.createObjectURL(new Blob([compilerSource.replaceAll('./cmaj-compiler-wasm.wasm', this.wasmURL.href)], { type: 'application/javascript' }));
		const worker = new Worker(workerURL);

		try {
			worker.postMessage({ action: 'compile', url });
			return await new Promise<CompilationResult>((resolve, reject) => {
				const canceller = () => {
					reject('cancelled');
					this.cancellers.splice(this.cancellers.indexOf(canceller), 1);
				};
				this.cancellers.push(canceller);
				return worker.onmessage = (event) => {
					event.data.error ? reject(event.data.error) : resolve(event.data);
					this.cancellers.splice(this.cancellers.indexOf(canceller), 1);
				};
			});
		} catch (e) { throw e; } finally {
			worker.terminate();
			URL.revokeObjectURL(workerURL);
		}
	}


}