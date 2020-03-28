const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// router.get('/add-user',userController.getAddUser);
// router.post('/add-user',userController.saveUser);
// router.get('/cart-items', userController.getCartItems);


module.exports = {
    routes : router
}