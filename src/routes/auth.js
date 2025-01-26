const express = require('express');
const { check , body } = require('express-validator');
// Here check will look for the field that we provide it(eg check('email')) in body , head , params , cookie.
// We will then apply some inbuilt functions to validate fields. If there are any errors it will collect those errors in validationResult of same package
// Then we can render page and send thse errors to page
const router = express.Router();

const AuthController = require('../controllers/auth');
router.get('/login',AuthController.login);

router.post('/login', [
check('email').isEmail().withMessage('Please enter valid email'), 
check('password','Please enter with minimum 5 characters and only alphanumeric').isLength({min : 5 , max : 20}).isAlphanumeric() ], 
AuthController.postLogin);


router.get('/logout' , AuthController.postLogout);

router.get('/signup', AuthController.singup);

router.post('/signup' , [
check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
body('password' , 'Please enter with minimum 5 characters and only alphanumeric').isLength({min : 6 , max : 20}).isAlphanumeric().trim(),
body('confirmPassword').custom((value , { req }) => {
    console.log(value.length +'  '+req.body.password.length)
    if(value != req.body.password){
        throw new Error('Password does not match')
    }
    return true
}).trim()
],
 AuthController.postSingup);

router.get('/reset-password' , AuthController.getResetPasswordEmail);
router.post('/reset-password-email' , AuthController.postResetPasswordEmail);
router.get('/reset/:token' , AuthController.getPasswordReset);
router.post('/reset' , AuthController.postPasswordReset);
module.exports = router;