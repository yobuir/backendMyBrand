const express= require('express');
const router =express.Router();
const commentController =  require('../../controllers/apis/commentsController');

router.get('/all',commentController.comment_index)
router.post('/create',commentController.comment_create);
router.get('/post/:id',commentController.comment_view);
router.put('/update/:id',commentController.comment_update);
router.delete('/:id',commentController.comment_delete);
module.exports =router;