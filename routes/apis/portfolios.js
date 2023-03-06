const portfoliosController = require('../../controllers/apis/portfoliosController');
const express=require('express');
const router=express.Router();

router.get('/all',portfoliosController.portfolios_index);
router.post('/create',portfoliosController.portfolios_create);
router.get('/view/:id',portfoliosController.portfolios_view);
router.put('/update/:id',portfoliosController.portfolios_update);
router.delete('/delete/:id',portfoliosController.portfolios_delete);
module.exports =router;