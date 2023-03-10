const express = require('express')
const router = express.Router(); 
const postsController= require('../../controllers/apis/postsController');
const {requireAuth,checkLoggedUser} = require('../../middleware/authMiddleware'); 
 

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - snippet
 *         - image
 *         - body 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         snippet:
 *           type: string
 *           description: snippet of the blog
 *         image:
 *           type: string
 *           description: The blog cover image
 *         body:
 *           type: string 
 *           description: The body of the blog 
*/

/**
 * @swagger  
 * /posts/{id}: 
 *   get:
 *     summary: gets one post
 *     tags: [ Posts ] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: one Post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post' 
 *       500:
 *         description: Some server error
 *       404:
 *         description: Post doesn't exist
 *              
 */


router.get('/all',postsController.post_index);
router.get('/:id',postsController.post_view);

router.post('/create',checkLoggedUser,postsController.post_create);
router.put('/update/:id',requireAuth,postsController.post_update);
router.delete('/:id',requireAuth,postsController.post_delete);

module.exports =router;