const express = require('express');
const router = express.Router(); 
const usersController= require('../../controllers/apis/usersController');

router.get('/all',usersController.listUsers);
router.get('/:id',usersController.viewUsers);
router.post('/create',usersController.createUser);
router.put('/update/:id',usersController.updateUsers);
router.delete('/delete/:id',usersController.deleteUser);

module.exports = router;