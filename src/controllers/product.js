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
    debugger; 
    // let product = new Product(req.body.title , req.body.price , null , req.user._id);
    let product = new Product({
        title : req.body.title,
        price : req.body.price,
        userId : req.user.id  // here even if we do like userId : user , mongoose will assigne only user._id to this ref
    })
    product.save().then(() =>{
        res.redirect('/'); // status code will be automatically get attched to it
    }).catch(err =>{
        console.log(err)
    });
}

exports.getProducts = (req , res , next) => {
    Product.find().then((result) =>{
        console.log(JSON.stringify(result));
        res.render('shop',{
            pageTitle : 'Product List' , 
            prods : result
            
        });
    }).catch(err =>{
        console.log(err);
    });    
}

exports.getProduct = (req , res , next) => {
    console.log('product id to find is '+req.params.productId);
    Product.findById(req.params.productId).then(result =>{
        console.log(JSON.stringify(result));
        res.render('product-details',{
            pageTitle : 'Product Details' , 
            prods : result
        })
    }).catch(err =>{
        console.log(err);
    })
}

exports.getEditProduct = (req , res , next) => {
    Product.findById(req.params.productId).then(result =>{
        res.render('edit-product',{
            pageTitle : 'Product Details' , 
            product : result
        })
    }).catch(err =>{
        console.log(err);
    })
}

exports.updateProduct = (req , res , next) =>{
    // let product = new Product(req.body.title , req.body.price , new mongodb.ObjectID(req.params.productId));
    Product.findById(req.params.productId).then(product =>{
        product.title = req.body.title;
        product.price = req.body.price;
        return product.save();

    }).then(result =>{
        res.redirect('/');
    })
    
}

exports.deleteProduct = (req , res , next) =>{
    // let productDeleted = Product.deleteDocument(req.params.productId);
    Product.findByIdAndRemove(req.params.productId).then(()=>{
        console.log('deleted');
        res.redirect('/');
    })
}

exports.addToCart = (req , res , next) =>{
    let productId = req.params.productId;
    debugger;
    return req.user.addToCart(productId).then(()=>{
        res.redirect('/user/cart-items/');
    });
}

exports.removeFromCart = (req , res , next) => {
    debugger;
    let productId = req.params.productId;
    return req.user.removeFromCart(productId).then(() =>{
        res.redirect('/user/cart-items');
    })
}