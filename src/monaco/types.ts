import monaco from '../../artifacts/monaco';
export type LanguageDefinition = {
	language: monaco.languages.ILanguageExtensionPoint,
	configutation?: monaco.languages.LanguageConfiguration,
	themeData?: monaco.editor.IStandaloneThemeData,
	hoverProvider?: monaco.languages.HoverProvider,
	tokensProvider?: monaco.languages.IMonarchLanguage,
	completionItemProvider?: monaco.languages.CompletionItemProvider
	documentFormattingEditProvider?: monaco.languages.DocumentFormattingEditProvider
}