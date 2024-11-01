export type PatchView = {
	src: string;
	resizable: boolean;
	width?: number;
	height?: number;
};

export type Manifest = {
	CmajorVersion?: number;
	ID?: string;
	version?: string;
	name?: string;
	description?: string;
	category?: string;
	manufacturer?: string;
	isInstrument?: boolean;
	sourceTransformer?: string;
	view?: PatchView;
	worker?: string;
	source: string | string[];
	externals?: Record<string, string[]>;
};
export type File = string | Uint8Array;
export type Files = Record<string, File>;
export type CompilationResult = { code: string; version: number; manifest: Manifest; hash: string; };
export type ServedCompilationResult = CompilationResult & { url: string; };

