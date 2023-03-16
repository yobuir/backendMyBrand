const Comment=require('../../models/comments');


const comment_index = (req,res) =>{
 Comment.find().then((result) =>{
         return res.status(200)
                .send({ message: "viewing comment",data:result});
    }).catch((err) => {
        return  res.status(500).send({ message: "Error while viewing comment",error: err.message })
    });
}

const comment_create= (req,res) =>{
    const newComment= new Comment(req.body);
    // console.log(newComment);
    newComment.save().then((result) =>{ 
        return res.status(200)
                .send({ message: "Comment sent",data:result});
    }).catch((err) => {
        return  res.status(500).send({ message: "Error sending comment",error: err.message })
    });

}

const comment_view= (req,res) => {
  const id=req.params.id;
       Comment.find({post_id:id,},{_id:0,__v:0}).then((result) => {
             return res.status(200)
                .send({ message: "viewing comment",data:result});
        }).catch((err) => {
            return  res.status(500).send({ message: "Error viewing comment",error: err.message })
        });
}

const comment_update = (req, res) => {
    const id= req.params.id;
    const UpdateComment= req.body;
    Comment.findByIdAndUpdate(id, UpdateComment).then((result) => {
         return res
                .send({ message: "Comment updated",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error updating comment",error: err.message })
    });
};

const comment_delete =  async (req, res) => {
    const id=req.params.id;
      await Comment.findByIdAndDelete(id).then((result) => {
             return res
                    .send({ message: "Comment deleted"});
        }).catch((err)=>{
             return res
                    .status(500)
                    .json({ message: "Something went wrong", error: `Error: ${err}` });
        });
};






module.exports= {
  comment_create,comment_index,comment_view,comment_delete,comment_update
}