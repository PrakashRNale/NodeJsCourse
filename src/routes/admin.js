const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// /admin/add-product  -- GET
router.get('/add-product',productController.getAddProduct);


// // /admin/add-product  -- POST
router.post('/add-product',productController.postAddProduct);

// // /admin/update-product  -- POST
router.post('/update-product/:productId',productController.updateProduct);

router.get('/delete-product/:productId',productController.deleteProduct);

module.exports = {
    router : router
};
