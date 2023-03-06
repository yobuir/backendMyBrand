const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const portfoliosSchema= new Schema({ 
    title:{
        type:String,
        required:true
    }, 
     image:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
        required:true
    }
}, {timestamps:true});

const Portfolios=mongoose.model('Portfolio',portfoliosSchema);
module.exports =Portfolios;