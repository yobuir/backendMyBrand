const express = require('express')
const router = express.Router(); 
const postsController= require('../../controllers/apis/postsController');
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 
 
router.get('/all',postsController.post_index);
router.get('/:id',postsController.post_view);
router.post('/create',checkIfUserIsLogged,UserIsAdmin,postsController.post_create);
router.put('/update/:id',checkIfUserIsLogged,UserIsAdmin,postsController.post_update);
router.delete('/:id',checkIfUserIsLogged,UserIsAdmin,postsController.post_delete);
module.exports =router; 