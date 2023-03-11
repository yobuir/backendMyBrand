const portfoliosController = require('../../controllers/apis/portfoliosController');
const express=require('express');
const router=express.Router();
const {checkIfUserIsLogged,UserIsAdmin} = require('../../middleware/authMiddleware'); 
 
router.get('/all',portfoliosController.portfolios_index);
router.get('/view/:id',portfoliosController.portfolios_view);

router.post('/create',checkIfUserIsLogged,UserIsAdmin,portfoliosController.portfolios_create);
router.put('/update/:id',checkIfUserIsLogged,UserIsAdmin,portfoliosController.portfolios_update);
router.delete('/delete/:id',checkIfUserIsLogged,UserIsAdmin,portfoliosController.portfolios_delete);
module.exports =router;