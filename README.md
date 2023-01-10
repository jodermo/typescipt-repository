
# A clean starter repository for TypeScript projects

#### This repository contains basic stuff for to start an TypeScript project.

- Node.js configuration for TypeScript compiling [package.json](./package.json)
- Local test server for deployment [server.js](./server/server.js)
- API test data from JSON file: [example-data.json](./server/example-data.json)
- Example TypeScript Class: [MyTypeScriptClass.ts](./src/MyTypeScriptClass/MyTypeScriptClass.ts)
- HTML usement example: [index.html](server/www/index.html)

© 2023 by Moritz Petzka [https://petzka.com](https://petzka.com)

Contact: 
[typescript-development@petzka.com](mailto:typescript-development@petzka.com?subject=[GitHub]%20typescript-repository)
<br>

## Deployment

Scripts from [package.json](./package.json)

- Start the test server: `npm run start`
- Compile your TypeScript code: `npm run compile`
- Watch for changes in your TypeScript code: `npm run watch`
- Clean your TypeScript project: `npm run clean`


## Local Test-Server 

Node.js Server, source code: [/server/server.js](./server/server.js)

### To start the server, run `npm run server` or `npm run start`
(If you are working on code, it is recommended to run also: `npm run watch` in a different terminal)

- Server URL: [localhost:5000](http://localhost:5000)

- Example Data JSON file: [/server/example-data.json](./server/example-data.json)

- Example Data API URL: [localhost:5000/data](http://localhost:5000/data)

<br>


### Attention! Node.js Packages lose their connections on the test server.
#### Solution: For local deployment declare your Node.js packages for TypeScript imports in the index.html 

Index.html file: [/server/index.html](server/www/index.html)

Example:
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

