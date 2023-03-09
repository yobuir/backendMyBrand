const express = require('express')
const router = express.Router(); 
const postsController= require('../../controllers/apis/postsController');
const {requireAuth} = require('../../middleware/authMiddleware');

router.get('/all',postsController.post_index);
router.post('/create',requireAuth,postsController.post_create);
router.get('/:id',postsController.post_view);
router.put('/update/:id',postsController.post_update);
router.delete('/:id',postsController.post_delete);

module.exports =router;