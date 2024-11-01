import { languages } from '../../../../artifacts/monaco'

export const config: languages.LanguageConfiguration = {
	comments: {
		lineComment: "//",
		blockComment: ["/*", "*/"]
	},
	brackets: [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	],
	autoClosingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: '"', close: '"', notIn: ["string"] },
		{ open: "/*", close: "*/", notIn: ["string"] }
	]
};
