import CmajorCompiler from "./cmaj_api/cmaj-embedded-compiler.js";

self.onmessage = async function (event) {
	try {
		const data = event.data;
		const compiler = new CmajorCompiler();
		const parts = data.url.split("/");
		const manifestPath = parts.pop();
		const baseURL = new URL(parts.join("/") + "/");
		compiler.setManifestURL(baseURL, manifestPath);
		const code = await compiler.createJavascriptCode();
		const version = compiler.CmajorVersion;
		self.postMessage({ code, version });
	} catch (e: any) {
		self.postMessage({ error: e.message });
	}
};