const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto  = require('crypto');
const { validationResult } = require('express-validator');

const sendMail = require("../util/mail");
exports.login = (req , res , next) =>{
    console.log('in login view ');
    res.render('auth/login',{
        pageTitle : 'Login',
        errorMessage : '',
        oldInput : {
            email : '',
            password : ''
        }
    })
}

exports.postLogin = (req , res , next) =>{
    // res.setHeader('Set-Cookie','loggedIn:true');
    let {email , password} = req.body;
    let errors = validationResult(req);
    //validationResult function actually collects all errors that it get from check or body methods in route
    if(!errors.isEmpty()){
        res.render('auth/login',{
            pageTitle : 'Login',
            errorMessage : errors.array()[0].msg,
            oldInput : {
                email : email,
                password : password
            }
        })
    }
    User.findOne({email : email}).then(userDoc =>{
        if(!userDoc){
            res.render('auth/login',{
                pageTitle : 'Login',
                errorMessage : 'Invalid Email or Password',
                oldInput : {
                    email : email,
                    password : password
                }
            });
        }
        bcrypt.compare(password , userDoc.password).then(doPasswordMatch =>{
            if(doPasswordMatch){
                req.session.user = userDoc;
                req.session.isLoggedIn = true;
                return req.session.save(err =>{
                    sendMail(email);
                    res.redirect('/');
                })
            }
            res.render('auth/login',{
                pageTitle : 'Login',
                errorMessage : 'Invalid Email or Password',
                oldInput : {
                    email : email,
                    password : password
                }
            });
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
        errorMessage  : '',
        oldInput : {
            email : '',
            password : '',
            confirmPassword : ''
        }
    })
}

exports.postSingup = (req , res , next) =>{
    let {email , password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.render('auth/signup',{
            pageTitle : 'Signup' ,
            errorMessage : errors.array()[0].msg,
            oldInput : {
                email : email,
                password : password,
                confirmPassword : req.body.confirmPassword
            }
        });
    }
    
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
            var mailOptions = {
                from: 'prakashcsedyp@gmail.com',
                to: email,
                subject: 'Sign Up',
                html: `
                <p>Your signup is successfully done</p>
                `
              };
            sendMail(mailOptions);
            res.redirect('/login');
        })
        
    }).catch(err=>{
        console.log(err);
    })
}

exports.getResetPasswordEmail = (req , res , next) =>{
    res.render('auth/reset-password-email',
    {
        pageTitle : "Enter Email"
    });
}

exports.postResetPasswordEmail = (req , res , next) =>{
    console.log('in password reset ');
    let email = req.body.email;
    crypto.randomBytes(32 , (error , buffer) =>{
        if(error){
            console.log(error);
            return res.redirect('/reset-password');
        }
        let token = buffer.toString('hex');
        User.findOne({email : email}).then(user => {
            if(!user){
                res.redirect('/reset-password');
            }
    
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        }).then(result =>{
            console.log(token);
            var mailOptions = {
                from: 'prakashcsedyp@gmail.com',
                to: email,
                subject: 'Reset Password',
                html: `
                <p>You requested password reset</p>
                <p>click this <a href="http://localhost:5000/reset/${token}">link</a> to set a new a pssword</p> 
                `
              };
              sendMail(mailOptions);
              res.redirect('/reset');
        }).catch(err =>{
            console.log(err);
        })
    })
}

exports.getPasswordReset = (req , res , next) =>{
    let token = req.params.token;
    User.findOne({resetToken : token , resetTokenExpiration :  {$gt : Date.now()} }).then(user =>{
        res.render('auth/reset-password',{
            pageTitle : 'Password Reset',
            userId : user._id,
            passwordToken : token
        });
    }).catch(error =>{
        console.log(error);
    })
    
}

exports.postPasswordReset = (req , res , next) =>{
    let { password , userId , passwordToken } = req.body;
    let resetUser ; 
    User.findOne({
        resetToken : passwordToken , 
        resetTokenExpiration :  {$gt : Date.now()}, 
        _id : userId
    }).then(user =>{
        resetUser = user;
        return bcrypt.hash(password , 12).then();
    }).then(hashedPassword =>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        resetUser.save().then(result =>{
            res.redirect('/login');
        }).catch(error =>{
            console.log(error);
        })
    }).catch(err =>{
        console.log(err);
    })
}