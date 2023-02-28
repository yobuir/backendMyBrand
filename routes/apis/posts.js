const express = require('express')
const router = express.Router(); 
const data= {};

router.route('/')
    .get((req,res) => {
        res.json(data);
    })
    .post((req,res) => {
        console.log(req.body)
    })
    .put((req,res) => {

    })
    .delete((req,res) => {

    });

    router.route('/:id').get((req,res) => {
        res.json({id:req.params.id})
    })
module.exports =router;