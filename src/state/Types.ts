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
	source?: string | string[];
	externals?: Record<string, string[]>;
};
export type BuildResult = {
	code: string;
	version: string;
	manifest: Manifest;
	files: Record<string, string>;
}

export enum FileType {
	File = 'file',
	Dir = 'dir'
}
export type SourceFile = {
	type: 'file' | 'dir',
	path: string,
	content?: string | Uint8Array
}
export type ProjectInfo = {
	name: string;
	id: string;
	source?: ProjectSourceInfo;
	modified?: number;
};
export type ProjectTemplate = (name: string) => Promise<SourceFile[]> | SourceFile[];

export type LibrarianOptions = {
	templates?: Record<string, ProjectTemplate>;
	sources: Record<string, ProjectSource>;
	builders: Record<string, Builder>;
};

export type ProjectSourceInfo = {
	type: string;
	identifier?: string;
	meta?: any;
};
export type ProjectSource = {
	test(identifier: string): boolean;
	import(identifier: string): Promise<{ name: string; meta: any; files: SourceFile[]; }>;
};
export type BuilderSetting = {
	label: string;
	type: 'string' | 'number' | 'boolean' | 'select';
	default: any;
	values?: string[];
}
export type Builder = {
	test(path: string): boolean;
	worker: string;
	settings?: Record<string, BuilderSetting>;
}