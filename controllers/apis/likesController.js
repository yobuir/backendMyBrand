const Like=require('../../models/likes');

const like_index = async (req,res) => {
    const id=req.params.id;
     await Like.find({post_id:id,},{_id:0,__v:0}).then((result) => {
        return res
               .send({ message: "viewing all likes for post",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing all likes",error: err.message })
    });
}

const like_create = async (req,res) => {
    const likes = new Like(req.body);
    await likes.save().then((result) => {
        return res
               .send({ message: "liked post",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error liking post",error: err.message })
    });
}

const like_update = (req, res) => {
    const id= req.params.id; 
    const Updatelikedata=Post.findById(id);
    if(updatePost != null) {
       if(updatePost.Liked == 1){
        [...Updatelikedata,liked=0]
       }else{
         [...Updatelikedata,liked=1]
       }
    }
    Post.findByIdAndUpdate(id, Updatelikedata).then((result) => {
         return res
               .send({ message: "post updated",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error updating post",error: err.message })
    });
};

module.exports={like_index,like_update,like_create}