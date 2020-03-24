const express = require("express");
const router = express.Router();
const productController = require('../controllers/product');


router.get('/',productController.getProducts);
router.get('/product/:productId', productController.getProduct);
router.get('/edit-product/:productId', productController.getEditProduct);

module.exports = router;