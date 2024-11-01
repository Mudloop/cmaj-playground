import { uiTemplate } from "../templates/default-ui/uiTemplate";
import { defaultTemplate } from "../templates/default/defaultTemplate";
import { Librarian } from "./Librarian";
import { Builder } from "./Types";
import { ZipLoader } from "./ZipLoader";
export class PatchBuilder {
	static test = (path: string) => path.endsWith('.cmajorpatch');
	static worker = 'patch-worker.js';
}
export const library = new Librarian({
	templates: {
		default: defaultTemplate,
		ui: uiTemplate
	},
	sources: {
		zip: ZipLoader,
	},
	builders: {
		patch: PatchBuilder
	}
});

