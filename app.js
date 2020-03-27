const express = require('express');
const  bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');
const shopRoutes = require('./src/routes/shop');
const authRoutes = require('./src/routes/auth');

const User = require('./src/models/user');
const { mongoDBConnect } = require('./src/util/database');

const store = new MongoDBStore({
    uri : "mongodb+srv://prakash:prakash@cluster0-tkc4p.mongodb.net/NodeCourse",
    collection : "Session"
})

const app = express(); // Express is a functin we are assiging to app
app.set('view engine','ejs');
app.set('views','src/views');
app.use(bodyParser.urlencoded({extended:false}));
// follwoing express.static function allows us to server files statically. Here we are serving css files statically.
// Statically means not using express routing
app.use(session({
    secret : "secretkey",
    resave : false,
    saveUninitialized : false,
    store : store
}))
app.use((req , res , next) =>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user =>{
        debugger;
        req.user = new User(user.name , user.email, user.cart , user._id);
        // below code is used only with cookie
        if(req.get('Cookie').split(';').length > 1){
            req.isLoggedIn = !!req.get('Cookie').split(';')[1].split(':')[1];
        }
        next();
    }).catch(err=>{
        console.log(err);
    })
})

app.use(express.static(path.join(__dirname,'src', 'public'))); 
app.use("/admin",adminRoutes.router);
app.use("/user",userRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req , res , next) => {
    // res.status(404).sendFile(path.join(__dirname , 'src' , 'views' , 'not-found.html'));
    res.render('404',{pageTitle : 'Page Not Found'});
});
mongoDBConnect(client =>{
    app.listen(5000); // This listen method had internally implemented above two lines of code
})

