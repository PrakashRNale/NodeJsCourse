const express = require('express');
const  bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./src/models/user');
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');
const shopRoutes = require('./src/routes/shop');
const authRoutes = require('./src/routes/auth');

// const { mongoDBConnect } = require('./src/util/database'); // dont need this for mongoose

const store = new MongoDBStore({
    uri : "mongodb+srv://prakash:prakash@cluster0-tkc4p.mongodb.net/NodeCourse",
    collection : "Session"
})

const fileStorage = multer.diskStorage({
    destination : (req , file , callback) =>{
        callback(null ,path.join(__dirname,'images'));
    },
    filename : (req , file , callback) =>{
        callback(null , new Date().toISOString().replace(/:/g, '-') +"-"+ file.originalname);
    }
})

const fileFilter = (req , file , callback) =>{
    console.log(file);
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        callback(null , true);
    }else{
        callback(null , false)
    }
}

const app = express(); // Express is a functin we are assiging to app
app.set('view engine','ejs');
app.set('views','src/views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage : fileStorage , fileFilter : fileFilter}).single('image'))
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
        req.user = user;
        // below code is used only with cookie not for session
        if(req.get('Cookie').split(';').length > 1){
            req.isLoggedIn = !!req.get('Cookie').split(';')[1].split(':')[1];
        }
        next();
    }).catch(err=>{
        console.log('1');
        console.log(err);
    })
})

app.use((req , res , next) =>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

// follwoing express.static function allows us to server files statically. Here we are serving css files statically.
// Statically means not using express routing
app.use(express.static(path.join(__dirname,'src', 'public'))); 
app.use(express.static(path.join(__dirname,'images'))); 
app.use("/admin",adminRoutes.router);
app.use("/user",userRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req , res , next) => {
    // res.status(404).sendFile(path.join(__dirname , 'src' , 'views' , 'not-found.html'));
    res.render('404',{pageTitle : 'Page Not Found'});
});


//Followng middleware is special kind of middleware. Error handling middleware
// When Express detects anywhere in the code next(error) it calls error handling middleware.

// app.use((error , req , res , next) =>{
//     res.locals.isAuthenticated = true;
//     res.status(500).render('500',{pageTitle : "Error"});
// })

//With mongoose we dont need database.js file in util. 
//As mongoose will manage all utilities behind the scenes for us.
// We can use same connection that we have created below in all other files
mongoose.connect('mongodb+srv://prakash:prakash@cluster0-tkc4p.mongodb.net/NodeCourse',{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(result => {
    console.log('go to http://localhost:5000/');
    app.listen(5000);
}).catch(err =>{
    console.log('2');
    console.log(err);
})
// mongoDBConnect(client =>{
//     app.listen(5000); // This listen method had internally implemented above two lines of code
// })

