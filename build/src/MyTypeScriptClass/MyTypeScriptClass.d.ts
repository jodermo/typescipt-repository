export declare let MyTypeScriptClassCallbackNames: string[];
export declare type MyTypeScriptClassCallbackType = typeof MyTypeScriptClassCallbackNames[number];
export declare class MyTypeScriptClass {
    htmlElement: HTMLElement;
    loadingScreen: HTMLElement;
    ready: boolean;
    private callbacks;
    constructor(htmlElement: HTMLElement, loadingScreen: HTMLElement);
    init(): void;
    on(callbackName: MyTypeScriptClassCallbackType, callbackEvent: (result?: any) => void): void;
    private triggerCallback;
    dismissCallback(callbackName: MyTypeScriptClassCallbackType, callbackEvent: (result?: any) => void): void;
}
