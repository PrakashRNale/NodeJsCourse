const express = require('express');
const { check } = require('express-validator/check');
const router = express.Router();

const AuthController = require('../controllers/auth');
router.get('/login',AuthController.login);
router.post('/login' , AuthController.postLogin);
router.get('/logout' , AuthController.postLogout);
router.get('/signup', AuthController.singup);
router.post('/signup' , check('email').isEmail().withMessage('Please enter a valid email'), AuthController.postSingup);
router.get('/reset-password' , AuthController.getResetPasswordEmail);
router.post('/reset-password-email' , AuthController.postResetPasswordEmail);
router.get('/reset/:token' , AuthController.getPasswordReset);
router.post('/reset' , AuthController.postPasswordReset);
module.exports = router;