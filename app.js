const express = require('express');
const  bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shooRoutes = require('./routes/shop');

const app = express(); // Express is a functin we are assiging to app

app.use(bodyParser.urlencoded({extended:false}));

app.use("/admin",adminRoutes);
app.use(shooRoutes);

app.use((req , res , next) => {
    res.status(404).send(`
    <html>
        <body>
            <h1>Error - Page not found...</h1>
        </body>
    <html>
    `);
});

app.listen(5000); // This listen method had internally implemented above two lines of code