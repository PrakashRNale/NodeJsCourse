const express = require('express');

const router = express.Router();

router.get('/add-product',(req , res , next) => {
    res.send('<form action="/product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>');
});

router.post('/product',(req , res , next) => { 
    let newProduct = req.body.title;
    console.log(`new product is ${newProduct}`);
    res.redirect('/'); // status code will be automatically get attched to it
});

module.exports = router;
