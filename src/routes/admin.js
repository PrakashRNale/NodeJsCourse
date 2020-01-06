const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

// /admin/add-product  -- GET
router.get('/add-product',(req , res , next) => {
    //res.sendFile(path.join(__dirname , '../' , 'views' , 'add-product.html'));
    // or we can use more clean way of gatting root path
    res.sendFile(path.join(rootDir ,'src', 'views' , 'add-product.html'));
});


// /admin/add-product  -- POST
router.post('/add-product',(req , res , next) => { 
    let newProduct = req.body.title;
    console.log(`new product is ${newProduct}`);
    res.redirect('/'); // status code will be automatically get attched to it
});

module.exports = router;
