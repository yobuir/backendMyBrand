const jwt= require('jsonwebtoken');
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




module.exports =  {checkIfUserIsLogged};