const express= require('express');
const router =express.Router();
const commentController =  require('../../controllers/apis/commentsController');

router.get('/all',commentController.comment_index)
router.post('/create',commentController.comment_create);
module.exports =router;