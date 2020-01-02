const express = require("express");
const router = express.Router();

router.get('/',(req , res , next) => {
    console.log('This is middleware two, You can modify req and res objects here');
    res.send('<h1>This is a default page...</h1>');
});

module.exports = router;