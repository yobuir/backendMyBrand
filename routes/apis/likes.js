const express = require('express');
const router = express.Router(); 
const likeController = require('../../controllers/apis/likesController');


router.get('/:id', likeController.like_index_view);
router.get('/all', likeController.like_index);
router.post('/create', likeController.like_create);
router.put('/update/:id', likeController.like_update);

module.exports =router;