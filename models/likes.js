const mongoose=require('mongoose'); 
const Schema=mongoose.Schema;

const likesSchema= new Schema({
     liked:{
        type:Boolean,
        required: true,
     },
      post_id:{
        type:String,
        required: true
      },
      user_id:{
        type:String,
        required: true
      }

});


const likes= mongoose.model('Like',likesSchema)
module.exports = likes;