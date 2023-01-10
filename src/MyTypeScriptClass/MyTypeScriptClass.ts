// define callback names
export let MyTypeScriptClassCallbackNames = ['ready', 'update'];
// create callback type from callback names
export type MyTypeScriptClassCallbackType = typeof MyTypeScriptClassCallbackNames[number];

// main class
export class MyTypeScriptClass {

  // ready status
  public ready = false;

  // dynamic object for callback events
  private callbacks: any = {};

  // construction parameter
  constructor(public htmlElement: HTMLElement, public loadingScreen: HTMLElement) {
    // trigger init event after construction
    this.init();
  }

  // initialize event, triggered when class is created
  init() {
    this.triggerCallback('ready');
  }

  // callback listener, to register callbacks
  on(callbackName: MyTypeScriptClassCallbackType, callbackEvent: (result?: any) => void) {
    if (this.ready && callbackName === 'ready') {
      callbackEvent();
      return;
    }
    if (!this.callbacks[callbackName]) {
      this.callbacks[callbackName] = [];
    }
    if (!this.callbacks[callbackName].find((existingCallbackEvent: (result?: any) => void) => existingCallbackEvent === callbackEvent)) {
      this.callbacks[callbackName].push(callbackEvent);
    }
  }

  // trigger event, to fire callbacks
  private triggerCallback(callbackName: MyTypeScriptClassCallbackType, result?: any) {
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
  dismissCallback(callbackName: MyTypeScriptClassCallbackType, callbackEvent: (result?: any) => void) {
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
