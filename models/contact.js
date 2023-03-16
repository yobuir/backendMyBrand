const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const contactSchema = new Schema({  
     name: {
        type: String,
        required: true
     },
      email:{
        type: String,
        required: true
      },
      message:{
        type: String,
        required:true
      }
},{timestamps:true});
const contact = mongoose.model('Contact', contactSchema);
module.exports = contact; 