//const http = require('http'); // import this module to create server
//const fs = require('fs'); // import this module to work with file system
//const routeHandler = require('./routes'); // We dont need this router handler with express

const express = require('express');

const app = express(); // Express is a functin we are assiging to app

app.use((req , res , next) => {
    console.log('This is middleware one, You can modify req and res objects here');
    next(); // Without this controll will not reach to next middleware and req will be left hanged
});

app.use((req , res , next) => {
    console.log('This is middleware Two, You can modify req and res objects here');
    //Here default header content type is text/html so we dont need to set it. We can any time override it
    res.send('<h1>Hello from Express JS</h1>');
});
//const server = http.createServer(app);
//.listen(5000);

app.listen(5000); // This listen method had internally implemented above two lines of code