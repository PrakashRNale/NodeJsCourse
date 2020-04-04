const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const isAuth = require('../middlewares/is-auth');

// /admin/add-product  -- GET
router.get('/add-product',productController.getAddProduct);


// // /admin/add-product  -- POST
router.post('/add-product',isAuth ,productController.postAddProduct);

// // /admin/update-product  -- POST
router.post('/update-product/:productId',isAuth ,productController.updateProduct);

router.get('/delete-product/:productId', isAuth ,productController.deleteProduct);

module.exports = {
    router : router
};
