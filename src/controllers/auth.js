const User = require('../models/user');
const bcrypt = require('bcryptjs');
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
    let {email , password} = req.body;
    User.findOne({email : email}).then(userDoc =>{
        if(!userDoc){
            return res.redirect('/login');
        }
        debugger;
        bcrypt.compare(password , userDoc.password).then(doPasswordMatch =>{
            if(doPasswordMatch){
                req.session.user = userDoc;
                req.session.isLoggedIn = true;
                return req.session.save(err =>{
                    res.redirect('/');
                })
            }
            res.redirect('/login');
        }).catch(err =>{
            res.redirect('/login');
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
    let {email , password} = req.body;
    User.findOne({email : email}).then(userDoc =>{
        if(userDoc){
            return res.redirect('/signup');
        }
        return bcrypt.hash(password , 5).then(hashedPassword =>{
            let user = new User({
                email : email , 
                password : hashedPassword
            })

            return user.save();
        }).then(result =>{
            res.redirect('/login');
        })
        
    }).catch(err=>{
        console.log(err);
    })
}