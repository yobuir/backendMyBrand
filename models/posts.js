const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const postsSchema= new Schema({ 
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
     image:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
        required:true,
        default:true
    }
}, {timestamps:true});

const Post=mongoose.model('Post',postsSchema);
module.exports =Post;