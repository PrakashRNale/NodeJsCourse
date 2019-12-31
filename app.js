const http = require('http'); // import this module to create server
//const fs = require('fs'); // import this module to work with file system
//const routeHandler = require('./routes'); // We dont need this router handler with express

const express = require('express');

const app = express();

app.use((req , res , next) => {
    console.log('This is middleware one, You can modify req and res objects here');
    //next(); // Without this controll will not reach to next middleware and req will be left hanged
});

app.use((req , res , next) => {
    console.log('This is middleware Two, You can modify req and res objects here');
    next(); // Without this controll will not reach to next middleware and req will be left hanged
});
const server = http.createServer(app);

server.listen(5000);