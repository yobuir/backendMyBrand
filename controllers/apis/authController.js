const User=require('../../models/users');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const createToken= require('../../handler/authHandler');

const maxAge = 24*60*60;

const login = async (req, res) => {
    const id=req.params.id;
       await User.findOne({email:req.body.email}).then((user) => { 
        
         if(user){  
            bcrypt.compare(req.body.password, user.password, function(err, result) { 

              if(result == false){
                return res.status(500).send({ message: "Entered password was incorrect",error:"Invalid password"});
              }else{
                  const token = createToken(user._id);
                  res.cookie('authUser',token,{httponly:true,maxAge:maxAge*1000});
                 return res.status(200).send({ message: "user authenticated now",data:user, token:token});
              }
              
              if(err){
                return res.status(500).send({ message: "Error occured",error:err.message});
              } 
            }); 
         }else{
        return res.status(500)
               .send({ message: "Entered email was incorrect",error:'Email was not found'})
         }

    }).catch((err) => {
        return res.status(500).send({ message: "Error occured",error:err.message});
    });
};



const getCurrentUser = async (req,res) => {
    const authHeader=req.headers['authorization'];

    if (!authHeader) return res.send({'message':'You need to be logged', 'error':''}).status(401);
        const token = authHeader.split(' ')[1];
       try {
        jwt.verify(token, process.env.JWT_SCRET, (error,decodedToken)=>
          {
            if(error) { 
                return  res.send({ message: "Token is invalid  ",error:error.message}).status(403);
                
            }else{ 
                User.findById(decodedToken.id).then((user) => {
                  return  res.send({ message: "logged user information  ",data:user}).status(200);
                }).catch((error) => {
                   return  res.send({ message: "error occured  ",error:error.message}).status(403);
                }); 
            }
          });
      }catch(e){
        return res.send({'message':'error occured', 'error':e.message}).status(500); //error
      }
      
    }

const logout =  async (req, res) => {
  res.cookie('authUser','',{maxAge:1});
  res.send({message: 'Logged out',data:''});
};

module.exports ={login,logout,getCurrentUser}