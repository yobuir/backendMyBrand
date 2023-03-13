const Post=require('../../models/posts');

const post_index = (req,res) => {
      Post.find().then((result) => {
        return res
               .send({ message: "viewing posts",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing posts",error: err.message }).status(500);
    });
}

const post_view =  async (req,res) => {
    const id=req.params.id;
      await Post.findById(id).then((result) => {
    if(!result) return res.status(404).send({ message: "not found",data:result});
       return res.status(200)
               .send({ message: "Viewing single post",data:result});
    }).catch((err) => {
        return  res.status(500).send({ message: "Error viewing post",error: err.message });
    });
}

const post_create = (req, res) => { 

   let userPost=req.body;
   
    const post = new Post(userPost);
      post.save().then ((result)=>{
          return res
               .send({ message: "post saved",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error saving post",error: err.message }).status(500);
    });
};


const post_update = (req, res) => {
    const id= req.params.id;
    const Updatepost= req.body;
    Post.findByIdAndUpdate(id, Updatepost).then((result) => {
         return res
               .send({ message: "post updated",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error updating post",error: err.message }).status(500);
    });
};


const post_delete = (req,res) =>{
     const id=req.params.id;
       Post.findByIdAndDelete(id).then((result) => {
         return res.status(200)
               .send({ message: "post deleted",data:result});
     }).catch((err)=>{
        return res.status(500).send({ message: "failed to delete post",data:err});
     });
}

module.exports = {
    post_index,post_view,post_create,post_delete,post_update
}