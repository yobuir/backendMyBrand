const User=require('../../models/users');
const bcrypt = require('bcrypt');

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
                        return res
                        .send({ message: "user created",data:user});
                    }).catch((err) => {
                        return res.send({ message: "failed to create user",data:err.message});
                    });

              } else{
                    console.log("User found");
                    return  res.send({ message: "Error creating user",error: "email have been taken" })
              }  
        }).catch((err) => {
            return  res.send({ message: "Error creating user",error: err.message })
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