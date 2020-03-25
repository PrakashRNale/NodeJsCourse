const express = require("express");
const router = express.Router();
const productController = require('../controllers/product');


router.get('/',productController.getProducts);
router.get('/product/:productId', productController.getProduct);
router.get('/edit-product/:productId', productController.getEditProduct);
router.get('/add-to-cart/:productId', productController.addToCart);
router.get('/remove-cart/:productId',productController.removeFromCart)

module.exports = router;