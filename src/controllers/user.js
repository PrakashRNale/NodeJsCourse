const User = require('../models/user');

exports.getAddUser = (req, resp , next) =>{
    resp.render('add-user',{
        pageTitle : 'Add User'
    })
}

exports.saveUser = (req, resp , next) =>{
    // let user = new User(req.body.name , req.body.email);
    let user = new User({
        name : req.body.name,
        email : req.body.email
    })
    user.save().then(result =>{
        resp.redirect('/'); 
    })
}

exports.getCartItems = (req , res , next) =>{

    req.user.populate('cart.items.productId').execPopulate().then(user =>{
        console.log(user.cart.items);
        res.render('cart',{
            pageTitle : 'Cart List' , 
            prods : user.cart.items
        });
    })
}