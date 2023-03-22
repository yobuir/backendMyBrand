const express= require('express');
const router =express.Router();
const commentController =  require('../../controllers/apis/commentsController');
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 
 
router.get('/all',commentController.comment_index);
router.get('/post/:id',commentController.comment_view);
router.post('/create',checkIfUserIsLogged,commentController.comment_create);
router.put('/update/:id',checkIfUserIsLogged,commentController.comment_update);
router.delete('/:id',checkIfUserIsLogged,commentController.comment_delete);
module.exports =router;