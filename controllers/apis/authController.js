 const User=require('../../models/users');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const createToken= require('../../handler/authHandler');

const maxAge = 3*60 * 24 *60;

const login = async (req, res) => {
    const id=req.params.id;
       await User.findOne({email:req.body.email}).then((user) => { 
         if(User){

            const x=  bcrypt.compare(user.password,req.body.password);
            console.log(x);
             return res
               .send({ message: "user authenticated user",data:user});
         }else{
        return res
               .send({ message: "Entered password is incorrect"})
         }

    }).catch((err) => {
        return res.send({ message: "Entered email is incorrect",data:err.message});
    });
};


module.exports ={login}