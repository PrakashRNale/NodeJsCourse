const User = require('../models/user');

exports.login = (req , res , next) =>{
    console.log('in login view ');
    res.render('auth/login',{
        pageTitle : 'Login',
        // isAuthenticated : req.isLoggedIn, // Only with cookie
        isAuthenticated : req.session.isLoggedIn
    })
}

exports.postLogin = (req , res , next) =>{
    // res.setHeader('Set-Cookie','loggedIn:true');
    User.findById('5e79e3501c9d440000f4847f').then(user =>{
        req.session.user = new User(user.name , user.email, user.cart , user._id);
        debugger;
        req.session.isLoggedIn = true;
        // below code is used only with cookie
        if(req.get('Cookie').split(';').length > 1){
            req.isLoggedIn = !!req.get('Cookie').split(';')[1].split(':')[1];
        }
        req.session.save(err =>{
            res.redirect('/');
        })
        
    }).catch(err=>{
        console.log(err);
    })
}

exports.postLogout = (req , res , next) =>{
    req.session.destroy(err =>{
        res.redirect('/');
    })
}

exports.singup = (req , res , next) =>{
    console.log('in signup');
    res.render('auth/signup',{
        pageTitle : 'Signup' ,
        isAuthenticated : req.session.isLoggedIn   
    })
}

exports.postSingup = (req , res , next) =>{
    // res.setHeader('Set-Cookie','loggedIn:true');
    User.findById('5e79e3501c9d440000f4847f').then(user =>{
        req.session.user = new User(user.name , user.email, user.cart , user._id);
        debugger;
        req.session.isLoggedIn = true;
        // below code is used only with cookie
        if(req.get('Cookie').split(';').length > 1){
            req.isLoggedIn = !!req.get('Cookie').split(';')[1].split(':')[1];
        }
        req.session.save(err =>{
            res.redirect('/');
        })
        
    }).catch(err=>{
        console.log(err);
    })
}