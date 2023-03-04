const express = require('express')
const router = express.Router(); 
const postsController= require('../../controllers/apis/postsController');
router.get('/all', postsController.post_index);
router.post('/create',postsController.post_create);
router.get('/:id',postsController.post_view);
router.delete('/:id',postsController.post_delete);

module.exports =router;