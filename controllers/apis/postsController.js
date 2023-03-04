const Post=require('../../models/posts');

const post_index = (req,res) => {
      Post.find().then((result) => {
        res.send(result);
     }).catch((err)=>{
         console.log(err);
     });
}


const post_view =  async (req,res) => {
    const id=req.params.id;
       Post.findById(id).then((result) => {
        res.send(result);
     }).catch((err)=>{
        console.log(err);
     });
}

const post_create = (req, res) => { 

   let userPost=req.body;
   
    const post = new Post(userPost);
      post.save().then ((result)=>{
        res.send(res);

      }).catch((err)=>{
        console.log(err);
      });
};

const post_delete = (req,res) =>{
     const id=req.params.id;
       Post.findByIdAndDelete(id).then((result) => {
        res.send(res);
     }).catch((err)=>{
        console.log(err.message);
     });
}

module.exports = {
    post_index,post_view,post_create,post_delete
}