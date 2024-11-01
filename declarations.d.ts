declare module '*.png' {
	const content: string;
	export default content;
}
declare module '*/iframe.js' {
	const workerPath: string;
	export default workerPath;
}

declare module '*.html' {
	const workerPath: string;
	export default workerPath;
}

declare module '*.cmajor' {
	const workerPath: string;
	export default workerPath;
}

declare module '*.cmajorpatch' {
	const workerPath: string;
	export default workerPath;
}

declare module '*.zip' {
	const workerPath: string;
	export default workerPath;
}

declare module '*.worker.js' {
	const content: string;
	export default content;
}
declare module '*.wasm' {
	const content: string;
	export default content;
}
declare module '*.html' {
	const content: string;
	export default content;
}
declare module '*.svg' {
	const content: string;
	export default content;
}
declare module '*template.js' {
	const content: string;
	export default content;
}

declare module '*.css' {
	const css: string;
	export default css;
}