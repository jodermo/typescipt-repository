# A clean starter repository for TypeScript projects

#### This repository contains basic stuff for to start an TypeScript project.

- Node.js configuration for TypeScript compiling [package.json](./package.json)
- Local test server for deployment [server.js](./server/server.js)
- API test data from JSON file: [example-data.json](./server/example-data.json)
- Example TypeScript Class: [MyTypeScriptClass.ts](./src/MyTypeScriptClass/MyTypeScriptClass.ts)
- HTML usement example: [index.html](server/www/index.html)

© 2023 by Moritz Petzka [https://petzka.com](https://petzka.com)<br>
Contact: [typescript-development@petzka.com](mailto:typescript-development@petzka.com?subject=[GitHub]%20typescript-repository)

<br>

## Deployment

Scripts from [package.json](./package.json)

- Start the test server: `npm run start`
- Compile your TypeScript code: `npm run compile`
- Watch for changes in your TypeScript code: `npm run watch`
- Clean your TypeScript project: `npm run clean`

*After compilation, you will find your compiled code in the [/build/](./build/) directory;*

## Local Test-Server

Node.js Server, source code: [/server/server.js](./server/server.js)

### To start the server, run `npm run server` or `npm run start`

(If you are working on code, it is recommended to run also: `npm run watch` in a different terminal)

- Server URL: [localhost:5000](http://localhost:5000)

- Example Data JSON file: [/server/example-data.json](./server/example-data.json)

- Example Data API URL: [localhost:5000/data](http://localhost:5000/data)

<br>
<br>


### Attention! Node.js Packages lose their connections on the test server.

### Simple solution: For local deployment declare your Node.js packages for TypeScript imports in the index.html:

```html

<body>
<script type="importmap">
        {
           "imports": {
               "package-name": "./node_modules/package-name/build/package-name.min.js"
           }
        }

</script>
...
```

Index.html file: [/server/index.html](./server/www/index.html)

<br>

## Examples

### TypeScript class `MyTypeScriptClass.ts`
```typescript
export let MyTypeScriptClassCallbackNames = ['ready', 'update'];
export type MyTypeScriptClassCallbackType = typeof MyTypeScriptClassCallbackNames[number];

export class MyTypeScriptClass {

  public ready = false;
  private callbacks: any = {};
  
  constructor(public htmlElement: HTMLElement, public loadingScreen: HTMLElement) {
    this.init();
  }
  
  init() {
    this.triggerCallback('ready');
  }
  
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

```
Index.html file: [/server/index.html](./src/MyTypeScriptClass/MyTypeScriptClass.ts)

### Usement of compiled code in HTML:
```html

<body>

    <div id="exampleContent">
        <h1>Hello World</h1>
    </div>
    
    <div id="loadingScreen">
        <b>loading...</b>
    </div>
    
    <script type="module">
      
        import {MyTypeScriptClass} from '/src/MyTypeScriptClass/MyTypeScriptClass.js';
        const exampleContent = document.getElementById('exampleContent');
        const loadingScreen = document.getElementById('loadingScreen');
        const MyTypeScriptComponent = new MyTypeScriptClass(exampleContent, loadingScreen);
        MyTypeScriptComponent.on('ready', () => {
          loadingScreen.classList.add('hidden');
        });
        console.log('MyTypeScriptComponent', MyTypeScriptComponent);

    </script>
</body>
```
Index.html file: [/server/index.html](./server/www/index.html)

<br>


