const jwt= require('jsonwebtoken');

const requireAuth = (req,res, next) => {
    const token =  req.cookie
    console.log(token);
    if(token){
       jwt.verify(token, 'yobu new screet', (error,decodedToken)=>
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

module.exports =  {requireAuth};