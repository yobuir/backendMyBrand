const User=require('../../models/users');
const bcrypt = require('bcrypt');
const createToken= require('../../handler/authHandler');
let maxAge = 3*60 * 24 *60;


const listUsers = async (req, res) => {
    await User.find().then((user) => { 
         return res
               .send({ message: "listing all users",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to fetch user",data:err.message});
    });
};


const createUser = async (req, res) => { 
    if(req.body.password === req.body.confirm_password) {
      
        const existingUser= await User.find({email:req.body.email}).then((result) => {
             let error=0;
            
            if(result.length === 0) {
                error=0
            }else{

                 if(result[0].email !==req.body.email) {
                    error=0;
                 }else{
                    error=1;
                 }
            }
               
              if(!error){ 
                  const userData=req.body; 
                    const newUser= new User(userData);  
                    newUser.save().then((user) => { 
                        const token = createToken(newUser._id);
                        res.cookie('authUser',token,{httponly:true,maxAge:maxAge*1000});
                        return res
                        .jsend.success({message:'User created successfully',user:user}); 
                    }).catch((err) => {
                        return res.send({ message:'User not created',error:err.message});
                    });

              } else{ 
                    return  res.send({ message: "Error creating user",error:"Email have been taken" })
              }  
        }).catch((err) => {
            return  res.send({ message: "Error creating user",error: err })
        }); 
    }else{
         return res.send({ message: "Please confirm your password",error:"error"});
    }
    
};


const viewUsers = async (req, res) => {
    const id=req.params.id;
       await User.findById(id).then((user) => { 
         return res
               .send({ message: "viewing single user",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to fetch user",data:err.message});
    });
};


const updateUsers = async (req, res) => {
    const id=req.params.id;
    const newUserUpdate=req.body;
    console.log(newUserUpdate);
       await User.findByIdAndUpdate(id,newUserUpdate).then((user) => { 
         return res
               .send({ message: "user Updated",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to update user",data:err.message});
    });
};

const deleteUser = async (req, res) => {
    const id=req.params.id;
       await User.findByIdAndDelete(id).then((user) => { 
         return res
               .send({ message: "user deleted",data:user});
    }).catch((err) => {

        return res.send({ message: "failed to delete user",data:err}).status(500);
    });
};



module.exports ={ listUsers,viewUsers,deleteUser,createUser,updateUsers};