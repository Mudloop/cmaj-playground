import { generateUniqueId } from "./util/generateUniqueId.js";
import { Files } from './Types.js';

type Resolvers = {
	[key: string]: {
		resolve: () => void;
		reject: (reason: any) => void;
	};
};

export class PatchService {

	static initializer: Promise<void>;
	static { this.initializer = this.init(); }
	static creationResolvers: Resolvers = {};
	static updateResolvers: Resolvers = {};
	private static async init() {
		const ret = await navigator?.serviceWorker?.register(new URL('../service.worker.js', import.meta.url));
		await navigator?.serviceWorker?.ready;
		navigator?.serviceWorker?.addEventListener('message', (event: MessageEvent<any>) => {
			const action = event.data.action;
			switch (action) {
				case 'serverCreated': {
					const { id, error } = event.data;
					if (!this.creationResolvers[id]) return;
					const { resolve, reject } = this.creationResolvers[id];
					if (id) resolve(); else reject(error);
					delete this.creationResolvers[id];
					return;
				}
				case 'filesUpdated': {
					const { id, error } = event.data;
					if (!this.updateResolvers[id]) return;
					const { resolve, reject } = this.updateResolvers[id];
					if (id) resolve(); else reject(error);
					delete this.updateResolvers[id];
					return;
				}
			}
		});
	}
	static async createServer(files: Files) {
		const id = generateUniqueId().toLowerCase();
		await this.initializer;
		await new Promise<void>((resolve, reject) => {
			this.creationResolvers[id] = { resolve, reject };
			navigator?.serviceWorker?.controller?.postMessage({ action: 'createServer', id, files });
		});
		return new URL(`./${id}/`, location.href).href;
	}
	static async updateFiles(files: Files, url: string) {
		await new Promise<void>((resolve, reject) => {
			const id: string = new URL(url).pathname.split('/').at(-2) ?? '';
			this.updateResolvers[id] = { resolve, reject };
			navigator?.serviceWorker?.controller?.postMessage({ action: 'updateFiles', id, files });
		});
	}
}