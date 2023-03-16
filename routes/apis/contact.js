const express= require('express');
const router =express.Router();
const contactController =  require('../../controllers/apis/contactController');
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 


router.get('/all',checkIfUserIsLogged,UserIsAdmin,contactController.contact_index)
router.post('/create',contactController.contact_create);
router.get('/contact/:id',checkIfUserIsLogged,UserIsAdmin,contactController.contact_view); 
router.delete('/delete/:id',checkIfUserIsLogged,UserIsAdmin,contactController.contact_delete);
module.exports =router;