const express= require('express');
const router =express.Router();
const contactController =  require('../../controllers/apis/contactController');

router.get('/all',contactController.contact_index)
router.post('/create',contactController.contact_create);
router.get('/contact/:id',contactController.contact_view); 
router.delete('/delete/:id',contactController.contact_delete);
module.exports =router;