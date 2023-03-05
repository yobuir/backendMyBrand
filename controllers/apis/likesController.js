const Like=require('../../models/likes');

const like_index = async (req,res) => { 
     await Like.find().then((result) => {
        console.log(result);
        return res
               .send({ message: "viewing all likes for post",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing all likes",error: err.message })
    });
}


const like_index_view = async (req,res) => {
    const id=req.params.id;
     await Like.find({post_id:id,},{_id:0,__v:0}).then((result) => {
        return res
               .send({ message: "viewing  likes for post",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing likes",error: err.message })
    });
}

const like_create = async (req,res) => {
    const likes = new Like(req.body);
    await likes.save().then((result) => {
        return res
               .send({ message: "post liked",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error liking post",error: err.message })
    });
}

const like_update = (req, res) => {
    const id= req.params.id; 
    const Updatelikedata=Like.findById(id); 
    if(Updatelikedata != null) {
       if(Updatelikedata.Liked == 1){
       [...Updatelikedata.liked=false];
        console.log(Updatelikedata);
       }else{
          [...Updatelikedata.liked=true];
          console.log(Updatelikedata);
       }
    }

    Like.findByIdAndUpdate(id, Updatelikedata).then((result) => {
         return res
               .send({ message: "post updated",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error updating post",error: err.message })
    });
};

module.exports={like_index,like_update,like_create,like_index_view}