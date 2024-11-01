import { isBinary } from './util/isBinary.js';
import { mime } from './util/mime.js';

class PatchService {

	static init() {
		self.addEventListener('fetch', (event: FetchEvent) => this.handleFetch(event));
		self.addEventListener('message', (event: MessageEvent) => this.handleMessage(event));
		self.addEventListener('install', (_event: any) => (self as any).skipWaiting());
		self.addEventListener('activate', (event: any) => event.waitUntil((globalThis as any).clients.claim()));
		setInterval(async () => await PatchService.checkClients(), 10000);
		this.checkClients();
		console.log("Patchservice ready")
	}
	static virtualServers: Record<string, VirtualServerData> = {};
	private static async checkClients() {
		return;
		const allClients = await (globalThis as any).clients.matchAll({
			includeUncontrolled: true,
		});
		const clientIds = allClients.map((client: any) => client.id);
		for (let server in this.virtualServers) {
			const age = Date.now() - this.virtualServers[server].lastAccessed;
			if (age < 1000 * 300) continue;
			if (!clientIds.includes(server)) delete this.virtualServers[server];
		}
		for (let visitor in this.visitors) {
			if (!clientIds.includes(visitor)) delete this.visitors[visitor];
		}
	}

	static handleMessage(event: MessageEvent<any>): any {
		const creator = event.source as MessageEventSource;
		switch (event.data.action) {
			case 'createServer': {
				const id = event.data.id;
				this.virtualServers[id] = { creator, files: event.data.files, lastAccessed: Date.now() };
				creator.postMessage({ action: 'serverCreated', id });
				return;
			}
			case 'updateFiles': {
				const id = event.data.id;
				if (this.virtualServers[id]) this.virtualServers[id].files = { ...this.virtualServers[id].files, ...event.data.files };
				creator.postMessage({ action: 'filesUpdated', id });
				return;
			}
		}

	}
	static visitors: Record<string, string> = {};
	static handleFetch(event: FetchEvent) {
		const ids = Object.keys(this.virtualServers);
		const url = new URL(event.request.url).pathname;
		for (let id of ids) {
			if (url.includes(`/${id}/`)) {
				this.serveFile(id, url.split(`/${id}/`)[1], event);
				return;
			}
		}
		const clientId = (event as any).clientId;
		if (this.visitors[clientId]) {
			const id = this.visitors[clientId];
			this.serveFile(id, url, event);
		}
	}
	static serveFile(id: string, path: string, event: FetchEvent) {
		const clientId = (event as any).clientId;
		if (clientId != '') this.visitors[clientId] = id;
		if (path == '') path = 'index.html';
		path = path.replaceAll('//', '/');
		if (path.startsWith('/')) path = path.slice(1);
		path = unescape(path);
		if (this.virtualServers[id].files[path]) {
			this.virtualServers[id].lastAccessed = Date.now();
			const mimeType = mime.getType(path) ?? 'text/plain';
			const contents = isBinary(mimeType) && typeof this.virtualServers[id].files[path] === 'string'
				? Uint8Array.from(atob(this.virtualServers[id].files[path] as string), c => c.charCodeAt(0))
				: this.virtualServers[id].files[path];
			const headers = new Headers();
			headers.set('Content-Type', mimeType);
			event.respondWith(new Response(contents, { headers }));
		} else {
			console.log(id, path, this.virtualServers[id].files);
		}
	}


}
PatchService.init();

type VirtualServerData = {
	creator: MessageEventSource;
	files: Record<string, string | Uint8Array>;
	lastAccessed: number;
}