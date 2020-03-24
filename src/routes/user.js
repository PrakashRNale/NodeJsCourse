const express = require('express');
const router = express.router();

const userController = require('../controllers/user');

router.get('/add-user',userController.getAddUser);

router.post('/add-user',userController.saveUser);

module.exports = {
    routes : router
}