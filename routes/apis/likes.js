const express = require('express');
const router = express.Router(); 
const likeController = require('../../controllers/apis/likesController');
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 
 
router.get('/all',likeController.like_index_all);
router.get('/:id', likeController.like_index_view);
router.post('/create',checkIfUserIsLogged,likeController.like_create);
router.put('/update/:id',checkIfUserIsLogged,likeController.like_update);

module.exports =router;