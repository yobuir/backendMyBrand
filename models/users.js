const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var {isEmail} = require('validator');
const bcrypt=require('bcrypt');
const userSchema = new Schema({

     name: {
        type: String,
        required: [true, "Name is Required"]
     },
      email:{
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        validate:[isEmail,"Enter valid email address"]
      },
      password:{
        type: String,
        required:true,
        minLength:[4,"Minimum password length is 4 characters"]
      },
      role:{
        type:String,
        required:true
      }
},{timestamps:true});

userSchema.pre('save', async function (next) {
 const salt= await bcrypt.genSalt();  
//  this key wrd referes to instance created when we are going to submit or save user
 this.password = await bcrypt.hash(this.password,salt);
 next();
});
const user=mongoose.model('User',userSchema);
module.exports = user;