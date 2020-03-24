const User = require('../models/user');

exports.getAddUser = (req, resp , next) =>{
    resp.render('add-user',{
        pageTitle : 'Add User'
    })
}

exports.saveUser = (req, resp , next) =>{
    let user = new User(req.params.name , req.params.age);
    user.save().then(result =>{
        resp.render('/');
    })
}