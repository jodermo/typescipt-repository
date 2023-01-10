// define callback names
export let MyTypeScriptClassCallbackNames = ['ready', 'update'];
// main class
export class MyTypeScriptClass {
    // construction parameter
    constructor(htmlElement, loadingScreen) {
        this.htmlElement = htmlElement;
        this.loadingScreen = loadingScreen;
        // ready status
        this.ready = false;
        // dynamic object for callback events
        this.callbacks = {};
        // trigger init event after construction
        this.init();
    }
    // initialize event, triggered when class is created
    init() {
        this.triggerCallback('ready');
    }
    // callback listener, to register callbacks
    on(callbackName, callbackEvent) {
        if (this.ready && callbackName === 'ready') {
            callbackEvent();
            return;
        }
        if (!this.callbacks[callbackName]) {
            this.callbacks[callbackName] = [];
        }
        if (!this.callbacks[callbackName].find((existingCallbackEvent) => existingCallbackEvent === callbackEvent)) {
            this.callbacks[callbackName].push(callbackEvent);
        }
    }
    // trigger event, to fire callbacks
    triggerCallback(callbackName, result) {
        if (callbackName === 'ready') {
            this.ready = true;
        }
        if (this.callbacks[callbackName]) {
            for (const callback of this.callbacks[callbackName]) {
                callback(result);
            }
        }
    }
    // remove registered callbacks
    dismissCallback(callbackName, callbackEvent) {
        if (this.callbacks[callbackName]) {
            for (let i = 0; i < this.callbacks[callbackName].length; i++) {
                if (this.callbacks[callbackName][i] === callbackEvent) {
                    this.callbacks[callbackName].splice(i, 1);
                    return;
                }
            }
        }
    }
}
//# sourceMappingURL=MyTypeScriptClass.js.map