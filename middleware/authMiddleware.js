const jwt= require('jsonwebtoken');
const User=require('../models/users');
require('dotenv').config();


const checkIfUserIsLogged = async (req,res,next) => {
    const authHeader=req.headers['authorization'];
    if (!authHeader) return res.status(401).send({'message':'You need to be logged', 'error':''});
    const token = authHeader.split(' ')[1];
    await jwt.verify(token,
                process.env.JWT_SCRET,
                async (error,decodedToken)=>
       {
        if(error)  return res.status(403).send({'message':'invalid token', 'error':error.message}); //invalid token
        req.user=decodedToken.id;
        next();
       }).catch((err)=>{
        return res.status(500).send({'message':'error occured', 'error':err.message}); //error
       });
   
}

const UserIsAdmin = async (req,res,next) => {
    const authHeader=req.headers['authorization'];
    if (!authHeader) return res.status(401).send({'message':'You need to be logged', 'error':''});
        const token = authHeader.split(' ')[1];
       try {
        jwt.verify(token, process.env.JWT_SCRET, (error,decodedToken)=>
          {
            if(error) { 
                return  res.status(403).send({ message: "Token is invalid  ",error:error.message});
                
            }else{ 
                User.findById(decodedToken.id).then((user) => { 
                if(user.role !== 'admin')return  res.status(403).send({ message: "Only admins are allowed to perform this task", error:"restricted task"});
                next();
                }).catch((error) => {
                   return  res.status(403).send({ message: "error occured  ",error:error.message});
                }); 
            }
          });
      }catch(e){
        return res.status(500).send({'message':'error occured', 'error':e.message}); //error
      }
      
    }




module.exports =  {checkIfUserIsLogged,UserIsAdmin};