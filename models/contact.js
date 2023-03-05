const mongoose = require('mongoose');
const  Schema=mongoose.Schema;


const contactSchema = new Schema ({
    
});
const contact = mongoose.model('Contact', contactSchema);
module.exports = {contact};