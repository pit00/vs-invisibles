import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext): void => {

    const getConfig = () => vscode.workspace.getConfiguration('whitespaceCounter');

    const isLanguageEnabled = (languageId: string): boolean => {
        const enabledLanguages = getConfig().get<string[]>("enabledLanguageIds", []);
        return enabledLanguages.length === 0 || enabledLanguages.includes(languageId);
    };

    const dispose = (decoType: { dispose(): any }) => {
        const index = context.subscriptions.indexOf(decoType);
        if (index !== -1) {
            context.subscriptions.splice(index, 1);
        }
        decoType.dispose();
    };

    /** Mapping target whitespaces to decoration-types. */
    const decoTypeMap = new Map<string, vscode.TextEditorDecorationType>();
    /** list of whitespace regex parts. */
    const regexParts: string[] = [];

    const createResources = (): void => {
        Array.from(decoTypeMap.values()).forEach(it => dispose(it));
        decoTypeMap.clear();
        regexParts.length = 0;

        const config = getConfig();
        const color = config.get<string>('color', "rgba(117, 255, 205, 0.38)");

        if (config.get<boolean>('space.enable', false)) {
            // for Space (U+0020)
            const decoSpace = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: config.get<string>('space.text', "₁"),
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decoTypeMap.set("\u0020", decoSpace);
            regexParts.push("(?<=[^\u0020\t\r\n\f])\u0020(?=[^\u0020\t\r\n\f])");
        }
        if (config.get<boolean>('multiple.enable', false)) {
            const decoSpace2 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            const decoSpace3 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            const decoSpace4 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
            });
            const decoSpace5 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄₅",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.OpenClosed,
            });
            const decoSpace6 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄₅₆",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
            });
            const decoSpace7 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄₅₆₇",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            const decoSpace8 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄₅₆₇₈",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            const decoSpace9 = vscode.window.createTextEditorDecorationType({
                before: {
                    width: "0",
                    contentText: "₁₂₃₄₅₆₇₈₉",
                    color: color
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decoTypeMap.set("\u0020\u0020", decoSpace2);
            decoTypeMap.set("\u0020\u0020\u0020", decoSpace3);
            decoTypeMap.set("\u0020\u0020\u0020\u0020", decoSpace4);
            decoTypeMap.set("\u0020\u0020\u0020\u0020\u0020", decoSpace5);
            decoTypeMap.set("\u0020\u0020\u0020\u0020\u0020\u0020", decoSpace6);
            decoTypeMap.set("\u0020\u0020\u0020\u0020\u0020\u0020\u0020", decoSpace7);
            decoTypeMap.set("\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020", decoSpace8);
            decoTypeMap.set("\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020", decoSpace9);
            regexParts.push("(?<=[^\u0020\t\r\n\f])\u0020{2,}(?=[^\u0020\t\r\n\f])");
            // \S not works... == [^\u0020\t\r\n\f]
        }
        if (config.get<boolean>('eof.enable', true)) {
            // for End of File
            const decoEof = vscode.window.createTextEditorDecorationType({
                after: {
                    width: "0",
                    contentText: config.get<string>('eof.text', "⛶"),
                    color: config.get<string>('eof.color', "rgba(117, 255, 205, 0.38)"),
                },
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decoTypeMap.set("eof", decoEof);
        }
        context.subscriptions.push(...decoTypeMap.values());
    };
    createResources();

    const updateDecorations = (editor: vscode.TextEditor): void => {
        const options = Array.from(decoTypeMap.values()).reduce(
            (map, decoType) => map.set(decoType, []),
            new Map<vscode.TextEditorDecorationType, vscode.DecorationOptions[]>());
        const text = editor.document.getText();
        const regex = new RegExp(regexParts.join("|"), "mg");
        const decoOther = decoTypeMap.get("other");
        Array.from(text.matchAll(regex)).forEach(match => {
            // `match.index` returned by `matchAll()` must exist.
            // ref. https://github.com/microsoft/TypeScript/issues/36788
            const startPos = match.index!;
            const target = match[0];
            const range = new vscode.Range(
                editor.document.positionAt(startPos),
                editor.document.positionAt(startPos + target.length)
            );
            const decoType = decoTypeMap.get(target);
            if (decoType) {
                options.get(decoType)?.push({ range });
            } else if (decoOther) {
                const hoverMessage = `U+${target.codePointAt(0)?.toString(16).padStart(4, '0')}`;
                options.get(decoOther)?.push({
                    range, hoverMessage
                });
            }
        });

        const decoEof = decoTypeMap.get("eof");
        if (decoEof) {
            const eofPosition = editor.document.positionAt(text.length);
            const range = new vscode.Range(eofPosition, eofPosition);
            options.get(decoEof)?.push({ range });
        }

        options.forEach((decoOptions, decoType) => editor.setDecorations(decoType, decoOptions));
    };

    const updateDecorationsIfPossible = (): void => {
        const editor = vscode.window.activeTextEditor;
        if (editor && isLanguageEnabled(editor.document.languageId)) {
            updateDecorations(editor);
        }
    };

    let timer: NodeJS.Timer | undefined = undefined;
    const triggerUpdateDecorations = (throttle = false): void => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        if (throttle) {
            const updateDelay = getConfig().get<number>('updateDelay', 100);
            timer = setTimeout(updateDecorationsIfPossible, updateDelay);
        } else {
            updateDecorationsIfPossible();
        }
    };
    triggerUpdateDecorations();

    vscode.window.onDidChangeActiveTextEditor(editor => {
        triggerUpdateDecorations();
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            triggerUpdateDecorations(true);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeConfiguration(_ => {
        createResources();
        triggerUpdateDecorations();
    }, null, context.subscriptions);
};

export const deactivate = (): void => { };
