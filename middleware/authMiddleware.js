const jwt= require('jsonwebtoken');

const requireAuth = (req,res, next) => {
    let token =  req.cookie 
    if(token  !== undefined){
        token = token.authUser;
       jwt.verify(token, process.env.JWT_SCRET, (error,decodedToken)=>
       {
        if(error) {
            console.log(error.message);
            
        }else{
            console.log(decodedToken);
             next();
        }
       }); 
    }
    else {
        console.log('you need to be logged')
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
            next();
     }
   
}

module.exports =  {requireAuth,checkLoggedUser};