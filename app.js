const express = require('express');
const  bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./src/routes/admin');
const shooRoutes = require('./src/routes/shop');

const app = express(); // Express is a functin we are assiging to app

app.use(bodyParser.urlencoded({extended:false}));
// follwoing express.static function allows us to server files statically. Here we are serving css files statically.
// Statically means not using express routing
app.use(express.static(path.join(__dirname,'src', 'public'))); 
app.use("/admin",adminRoutes);
app.use(shooRoutes);

app.use((req , res , next) => {
    res.status(404).sendFile(path.join(__dirname , 'src' , 'views' , 'not-found.html'));
});

app.listen(5000); // This listen method had internally implemented above two lines of code