const Product = require('../models/product');
const mongodb = require('mongodb');
exports.getAddProduct = (req , res , next) => {
    res.render('add-product',{
        pageTitle : 'Add Porduct',
        path :'/admin/add-product',
        formCss : true
    })
}

exports.postAddProduct = (req , res , next) => { 
    let product = new Product(req.body.title , req.body.price);
    product.save().then(() =>{
        res.redirect('/'); // status code will be automatically get attched to it
    });
}

exports.getProducts = (req , res , next) => {
    let productList = Product.fetchAll();
    productList.then((result) =>{
        res.render('shop',{pageTitle : 'Product List' , prods : result});
    }).catch(err =>{
        console.log(err);
    });    
}

exports.getProduct = (req , res , next) => {
    let product = Product.getProduct(req.params.productId);
    product.then(result =>{
        res.render('product-details',{pageTitle : 'Product Details' , prods : result})
    }).catch(err =>{
        console.log(err);
    })
}

exports.getEditProduct = (req , res , next) => {
    let product = Product.getProduct(req.params.productId);
    product.then(result =>{
        res.render('edit-product',{pageTitle : 'Product Details' , prods : result})
    }).catch(err =>{
        console.log(err);
    })
}

exports.updateProduct = (req , res , next) =>{
    let product = new Product(req.body.title , req.body.price , new mongodb.ObjectID(req.params.productId));
    product.save().then(() =>{
        res.redirect('/'); // status code will be automatically get attched to it
    });
}

exports.deleteProduct = (req , res , next) =>{
    let productDeleted = Product.deleteDocument(req.params.productId);
    productDeleted.then(()=>{
        console.log('deleted');
        res.redirect('/');
    })
}