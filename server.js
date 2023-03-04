const express = require('express');
const app= express();
const path= require('path');
const port=process.env.PORT || 3000;
const cors=require('cors');
const {logger } = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const mongoose= require('mongoose');
const postRoutes=require('./routes/apis/posts');

// connecting string
const  dburl='mongodb+srv://admin:admin@mybrand.xzmbnkn.mongodb.net/website?retryWrites=true&w=majority' 
mongoose.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true})
.then ((result)=>{
   app.listen(port,(error)=>{
        console.log(`listening on ${port}`);
    });
}).catch((err)=>{
    console.log(err);
}); 




// custom middleware
app.use(logger);
// this is for rendering the static files
app.use(express.static(path.join(__dirname,'/public')));

// third party middleware 
const whiteList= ['http://127.0.0.1:5500','http://localhost:3000'];
const corsOptions = {
    origin:function(origin,callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("You are not allowed to access this apis"));
        }
    },
    optionsSuccessStatus:200
}
 
app.use(cors());


// built in middleware to handle urlencoded
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//blog apis 
app.use('/posts',postRoutes);

// page not found
app.all('*', (req, res) => {
    res.sendFile('404.html',{root:__dirname})
}); 

app.use(errorHandler);