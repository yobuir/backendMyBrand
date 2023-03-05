const User=require('../../models/users');


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
        const newUser= new User(req.body); 
        await newUser.save().then((user) => { 
            return res
               .send({ message: "user created",data:user});
        }).catch((err) => {
            return res.send({ message: "failed create user",data:err.message});
        });
    }else{
         return res.send({ message: "Please confirm your password"});
    }
    
};


const viewUsers = async (req, res) => {
    const id=req.params.id;
       await User.findById(id).then((user) => { 
         return res
               .send({ message: "viewing user",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to fetch user",data:err.message});
    });
};


const updateUsers = async (req, res) => {
    const id=req.params.id;
       await User.findById(id).then((user) => { 
         return res
               .send({ message: "viewing user",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to fetch user",data:err.message});
    });
};



const deleteUser = async (req, res) => {
    const id=req.params.id;
       await User.findByIdAndDelete(id).then((user) => { 
         return res
               .send({ message: "user deleted",data:user});
    }).catch((err) => {
        return res.send({ message: "failed to delete user",data:err});
    });
};



module.exports ={ listUsers,viewUsers,deleteUser,createUser,updateUsers};