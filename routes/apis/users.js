const express = require('express');
const router = express.Router(); 
const usersController= require('../../controllers/apis/usersController');


router.post('/create',usersController.createUser);

module.exports = router;