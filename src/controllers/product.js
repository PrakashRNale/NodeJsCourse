const Product = require('../models/product');

exports.getAddProduct = (req , res , next) => {
    res.render('add-product',{
        pageTitle : 'Add Porduct',
        path :'/admin/add-product',
        formCss : true
    })
}

exports.postAddProduct = (req , res , next) => { 
    let product = new Product(req.body.title);
    product.save();
    res.redirect('/'); // status code will be automatically get attched to it
}

exports.getProducts = (req , res , next) => {
    let productList = Product.fetchAll();
    res.render('shop',{pageTitle : 'Product List' , prods : productList});
}