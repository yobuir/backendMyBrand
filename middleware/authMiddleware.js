const jwt= require('jsonwebtoken');

const requireAuth = (req,res, next) => {
    let token =  req.cookie 
    console.log(token);
    if(token  !== undefined){
        token = token.authUser;
       jwt.verify(token, process.env.JWT_SCRET, (error,decodedToken)=>
       {
        if(error) { 
             return  res.send({ message: "Error occured perfomming task",error:error.message}).status(401);
            
        }else{
            console.log(decodedToken);
             next();
        }
       }); 
    }
    else {
        return  res.send({ message: "Error occured perfomming task",error:"you need to be logged"}).status(401);
    }
   
}


const checkLoggedUser = (req,res, next) => {
       let token =  req.cookie 
    if(token !== undefined){
        token = token.authUser
       jwt.verify(token,process.env.JWT_SCRET, async (error,decodedToken)=>
       {
        if(error) {
            console.log(error.message);
            res.locals.user=null;
            next();
        }else{
            console.log(decodedToken);
            let user = await User.findById(decodedToken.id);
            res.locals.user=user;
             next();
        }
       }); 
    }
    else {
         res.locals.user=null;
            // next();
     }
   
}

module.exports =  {requireAuth,checkLoggedUser};