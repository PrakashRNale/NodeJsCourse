const express = require('express');

const router = express.Router();

// /admin/add-product  -- GET
router.get('/add-product',(req , res , next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>');
});


// /admin/add-product  -- POST
router.post('/add-product',(req , res , next) => { 
    let newProduct = req.body.title;
    console.log(`new product is ${newProduct}`);
    res.redirect('/'); // status code will be automatically get attched to it
});

module.exports = router;
