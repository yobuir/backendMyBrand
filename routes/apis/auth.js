const express = require('express');
const router = express.Router(); 
const authController= require('../../controllers/apis/authController');

router.get('/login',authController.login); 
router.post('/logout',authController.logout);
module.exports = router;