const jwt= require('jsonwebtoken');
const User=require('../models/users');
require('dotenv').config();


const checkIfUserIsLogged = async (req,res,next) => {
    const authHeader=req.headers['authorization'];
    if (!authHeader) return res.send({'message':'no access right provided', 'error':''}).status(401);
    const token = authHeader.split(' ')[1];
    await jwt.verify(token,
                process.env.JWT_SCRET,
                async (error,decodedToken)=>
       {
        if(error)  return res.send({'message':'invalid token', 'error':error.message}).status(403); //invalid token
        req.user=decodedToken.id;
        next();
       }).catch((err)=>{
        return res.send({'message':'error occured', 'error':err.message}).status(500); //error
       });
   
}

const UserIsAdmin = async (req,res,next) => {
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
                if(user.role !== 'admin')return  res.send({ message: "Only admins are allowed to perform this task", error:"restricted task"}).status(403);
                next();
                }).catch((error) => {
                   return  res.send({ message: "error occured  ",error:error.message}).status(403);
                }); 
            }
          });
      }catch(e){
        return res.send({'message':'error occured', 'error':e.message}).status(500); //error
      }
      
    }




module.exports =  {checkIfUserIsLogged,UserIsAdmin};