const http = require('http'); // import this module to create server
//const fs = require('fs'); // import this module to work with file system
const routeHandler = require('./routes');
console.log(routeHandler.someText);
const server = http.createServer(routeHandler.handler);

server.listen(5000);