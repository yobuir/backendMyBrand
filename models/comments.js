const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const commentSchema= new Schema({
    post_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }, 
    comment:{
        type:String,
        required:true
    }
});

const comment= mongoose.model("Comment",commentSchema);
module.exports = comment;
