const User=require('../../models/users');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const createToken= require('../../handler/authHandler');

const maxAge = 3*60 * 24 *60;

const login = async (req, res) => {
    const id=req.params.id;
       await User.findOne({email:req.body.email}).then((user) => { 
         if(User){  
            bcrypt.compare(req.body.password, user.password, function(err, result) { 

              if(result == false){
                return res.send({ message: "Entered password was incorrect",error:"Invalid password"});
              }else{
                  const token = createToken(user._id);
                  res.cookie('authUser',token,{httponly:true,maxAge:maxAge*1000});
                 return res.send({ message: "user authenticated now",data:user});
              }
              
              if(err){
                return res.send({ message: "Error occured",error:err.message});
              } 
            }); 
         }else{
        return res
               .send({ message: "Entered email was incorrect",error:'Email was not found'})
         }

    }).catch((err) => {
        return res.send({ message: "Error occured",error:err.message});
    });
};

const logout =  async (req, res) => {
  res.cookie('authUser','',{maxAge:1});
  res.send({message: 'Logged out',data:''});
};

module.exports ={login,logout}