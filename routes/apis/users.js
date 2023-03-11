const express = require('express');
const router = express.Router(); 
const usersController= require('../../controllers/apis/usersController');
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 
 
router.post('/create',usersController.createUser);

router.get('/all',checkIfUserIsLogged,UserIsAdmin,usersController.listUsers);
router.get('/:id',checkIfUserIsLogged,usersController.viewUsers);
router.put('/update/:id',checkIfUserIsLogged,usersController.updateUsers);
router.delete('/delete/:id',checkIfUserIsLogged,usersController.deleteUser);

module.exports = router;