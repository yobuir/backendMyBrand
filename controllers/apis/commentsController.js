const Comment=require('../../models/comments');


const comment_index = (req,res) =>{
 Comment.find().then((result) =>{
        console.log(JSON.stringify(result));
        res.send(res);
    }).catch((err) =>{
        console.log(err);
    });
}

const comment_create= (req,res) =>{
    const newComment= new Comment(req.body);
    // console.log(newComment);
    newComment.save().then((result) =>{
        console.log(JSON.stringify(result));
        res.send(res);
    }).catch((err) =>{
        console.log(err);
    });

}



module.exports= {
  comment_create,comment_index
}