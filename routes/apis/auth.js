const express = require('express');
const router = express.Router(); 
const authController= require('../../controllers/apis/authController');
const {checkIfUserIsLogged} = require('../../middleware/authMiddleware'); 


router.post('/login',authController.login); 
router.get('/profile',checkIfUserIsLogged,authController.getCurrentUser);
router.post('/logout',checkIfUserIsLogged,authController.logout);
module.exports = router;