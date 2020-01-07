const express = require("express");
const router = express.Router();
const products = require('./admin');
const path = require('path');
const rootDir = require('../util/path');

router.get('/',(req , res , next) => {
    console.log('This is middleware two, You can modify req and res objects here');
    // res.sendFile(path.join(rootDir ,'src', 'views' , 'shop.html'));
    console.log(products.product);
    res.render('shop',{pageTitle : 'Product List' , prods : products.product });
});

module.exports = router;