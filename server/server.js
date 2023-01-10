import * as http from 'http';
import * as fs from 'fs';
import * as url from "url";
import path from "path";

// declare available mime types for file server
var mimeTypes = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'json': 'application/json',
  'js': 'text/javascript',
  'ts': 'text/javascript',
  'css': 'text/css'
};

// create the server
var server = http.createServer(function (request, response) {

  // server response handling

  // get request path
  var uri = url.parse(request.url).pathname;

  // handle response for different paths
  if (uri.includes('/src/')) {
    // serve compiled TypeScript files from src directory:

    // get the file name
    var filename = path.join(process.cwd(), uri);
    var fileExtension = filename.split('.').pop();
    if (!fileExtension || filename.split('.').length < 1) {
      // set .js as file extension if there is no file extension
      fileExtension = 'js';
      filename += '.' + fileExtension;
    }

    // set build path for compiled files
    filename = filename.replace('\\src\\', '\\build\\src\\');

    // find the mime type
    var mimeType = mimeTypes[fileExtension];
    if (!mimeType) {
      // set default mime type
      mimeType = 'text/plain';
    }
    // read the file source
    fs.readFile(filename, function (error, fileBuffer) {
      if (error) {
        // error handling
        response.writeHead(404);
        response.end(JSON.stringify(error));
        return;
      }
      // set the mime type for the response
      response.writeHead(200, {'Content-Type': mimeType});
      // return the file
      response.end(fileBuffer);
    });
  } else if (uri.includes('/node_modules/')) {
    // serve files from node_modules:

    // get the file name
    var filename = path.join(process.cwd(), uri);

    // find the mime type
    var mimeType = mimeTypes[fileExtension];
    if (!mimeType) {
      // set default mime type
      mimeType = 'text/plain';
    }

    // read the file source
    fs.readFile(filename, function (error, fileBuffer) {
      if (error) {
        // error handling
        response.writeHead(404);
        response.end(JSON.stringify(error));
        return;
      }
      // set the mime type for the response
      response.writeHead(200, {'Content-Type': mimeType});
      // return the file
      response.end(fileBuffer);
    });

  } else if (uri === '/data') {

    // serve example data
    fs.readFile('server/example-data.json', function (err, data) {
      if (err) {
        // error handling
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      // set the mime type for the response
      response.writeHead(200, {'Content-Type': 'application/json'});
      // return the file
      response.end(data);
    });
  } else if (uri.includes('/assets/')) {
    // serve assets

    // get the file name
    var filename = path.join(process.cwd(), uri);
    var fileExtension = filename.split('.').pop();
    filename = filename.replace('\\assets\\', '\\server\\www\\assets\\');
    // find the mime type
    var mimeType = mimeTypes[fileExtension];
    if (!mimeType) {
      // set default mime type
      mimeType = 'text/plain';
    }
    // read the file source
    fs.readFile(filename, function (error, fileBuffer) {
      if (error) {
        // error handling
        response.writeHead(404);
        response.end(JSON.stringify(error));
        return;
      }
      // set the mime type for the response
      response.writeHead(200, {'Content-Type': mimeType});
      // return the file
      response.end(fileBuffer);
    });
  }else {
    fs.readFile('server/www/index.html', function (err, data) {
      // serve index.html
      if (err) {
        // error handling
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      // set the mime type for the response
      response.writeHead(200);
      // return the file
      response.end(data);
    });
  }
});

// run the server on port 5000
server.listen(5000);

// log in terminal that the server is started
console.log('Node.js web server at port 5000 is running..')
