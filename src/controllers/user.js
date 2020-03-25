const User = require('../models/user');

exports.getAddUser = (req, resp , next) =>{
    resp.render('add-user',{
        pageTitle : 'Add User'
    })
}

exports.saveUser = (req, resp , next) =>{
    let user = new User(req.body.name , req.body.email);
    user.save().then(result =>{
        resp.redirect('/'); 
    })
}

exports.getCartItems = (req , res , next) =>{
    req.user.getCartItems().then(items =>{
        res.render('cart',{pageTitle : 'Cart List' , prods : items});
    })
}