const express = require('express')
const router = express.Router(); 
const postsController= require('../../controllers/apis/postsController');
const {checkIfUserIsLogged} = require('../../middleware/authMiddleware'); 
 
router.get('/all',postsController.post_index);
router.get('/:id',postsController.post_view);

router.post('/create',checkIfUserIsLogged,postsController.post_create);
router.put('/update/:id',checkIfUserIsLogged,postsController.post_update);
router.delete('/:id',checkIfUserIsLogged,postsController.post_delete);

module.exports =router; 