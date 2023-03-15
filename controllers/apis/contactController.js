const Contact=require('../../models/contact');

const contact_index = async  (req,res) =>{
   await Contact.find().then((result) =>{
         return res
                .send({ message: "viewing Contacts",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error while viewing Contact",error: err.message })
    });
}  

const contact_create = async (req,res) => {
    let contactPost=req.body;

    const contact = new Contact(contactPost);
      contact.save().then ((result)=>{
          return res.status(200)
               .send({ message: "contact message saved",data:result});
    }).catch((err) => {
        return  res.status(500).send({ message: "Error saving contact",error: err.message })
    });

}

const contact_view = async (req,res) => {
    const id=req.params.id;
    await Contact.findById(id).then((result) =>{
         return res
                .send({ message: "viewing single contact",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error while viewing Contact",error: err.message })
    });
}


const contact_delete = async(req,res) => {
    const id=req.params.id;
    await Contact.findByIdAndDelete(id).then((result) =>{
         return res
                .send({ message: "contact deleted",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error while deleting Contact",error: err.message })
    });
}

module.exports = {contact_view,contact_delete,contact_create,contact_index}