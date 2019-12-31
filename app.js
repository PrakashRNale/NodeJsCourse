//const http = require('http'); // import this module to create server
const fs = require('fs'); // import this module to work with file system
//const routeHandler = require('./routes'); // We dont need this router handler with express
const  bodyParser = require('body-parser');
const express = require('express');

const app = express(); // Express is a functin we are assiging to app

// app.use((req , res , next) => {
//     console.log('This is middleware one, You can modify req and res objects here');
//     next(); // Without this controll will not reach to next middleware and req will be left hanged
// });

// app.use((req , res , next) => {
//     console.log('This is middleware Two, You can modify req and res objects here');
//     //Here default header content type is text/html so we dont need to set it. We can any time override it
//     res.send('<h1>Hello from Express JS</h1>');
// });

app.use(bodyParser.urlencoded({extended:false}));

app.use('/',(req , res , next)=>{
    console.log('Use this middleware for all the routes');
    next();
})

app.use('/addUsers',(req , res , next) => {
    res.send('<form action="/users" method="POST"><input type="text" name ="user"><button type="submit">Add User</button></form>');
});

app.use('/users',(req , res , next) => {
    console.log(req.body);
    let newUser = req.body.user;
    fs.writeFile('user.txt', newUser , error=>{
        res.redirect('/');
    });
    
});

app.use('/',(req , res , next) => {
    console.log('This is middleware two, You can modify req and res objects here');
    res.send('<h1>This is a default page</h1>');
});
//const server = http.createServer(app);
//.listen(5000);

app.listen(5000); // This listen method had internally implemented above two lines of code