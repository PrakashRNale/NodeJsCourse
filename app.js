const express = require('express');
const  bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');
const { mongoDBConnect } = require('./src/util/database');

const app = express(); // Express is a functin we are assiging to app
app.set('view engine','ejs');
app.set('views','src/views');
app.use(bodyParser.urlencoded({extended:false}));
// follwoing express.static function allows us to server files statically. Here we are serving css files statically.
// Statically means not using express routing
app.use(express.static(path.join(__dirname,'src', 'public'))); 
app.use("/admin",adminRoutes.router);
app.use(shopRoutes);

app.use((req , res , next) => {
    // res.status(404).sendFile(path.join(__dirname , 'src' , 'views' , 'not-found.html'));
    res.render('404',{pageTitle : 'Page Not Found'});
});

mongoDBConnect(client =>{
    app.listen(5000); // This listen method had internally implemented above two lines of code
})

