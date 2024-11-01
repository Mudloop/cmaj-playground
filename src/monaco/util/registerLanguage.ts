import { LanguageDefinition } from "../types";
import monaco from '../../../artifacts/monaco';
export function registerLanguage(info: LanguageDefinition) {
	monaco.languages.register(info.language);
	if (info.configutation) monaco.languages.setLanguageConfiguration(info.language.id, info.configutation);
	if (info.themeData) monaco.editor.defineTheme("vs-dark", info.themeData);
	if (info.hoverProvider) monaco.languages.registerHoverProvider(info.language.id, info.hoverProvider);
	if (info.tokensProvider) monaco.languages.setMonarchTokensProvider(info.language.id, info.tokensProvider);
	if (info.completionItemProvider) monaco.languages.registerCompletionItemProvider(info.language.id, info.completionItemProvider);
	if (info.documentFormattingEditProvider) monaco.languages.registerDocumentFormattingEditProvider(info.language.id, info.documentFormattingEditProvider);
}
