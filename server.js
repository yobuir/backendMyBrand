const express = require('express');
require('dotenv').config();
const app= express();
const path= require('path');
const port=process.env.PORT || 3000;
const cors=require('cors');
const mongoose= require('mongoose');
const jsend=require('jsend');
const cookieParser = require('cookie-parser');
const postRoutes=require('./routes/apis/posts');
const commentsRoutes=require('./routes/apis/comments');
const likesRoutes=require('./routes/apis/likes');
const usersRouters=require('./routes/apis/users');
const contactRouters=require('./routes/apis/contact');
const portfoliosRoutes=require('./routes/apis/portfolios');
const authRouters=require('./routes/apis/auth');
const {logger } = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const {requireAuth,checkLoggedUser} = require('./middleware/authMiddleware');
const swaggerUI=require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { setup } = require('swagger-ui-express');
// connecting string
const  dburl=process.env.DB_URL;
mongoose.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true})
.then ((result)=>{
   app.listen(port,(error)=>{
        console.log(`listening on ${port}`);
    });
}).catch((err)=>{
    console.log(err);
}); 


// swagger apis documantion

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API Documentation",
            version:"1.0.0",
            description:"API Documentation for blog post",
        },
        servers:[
            {
                url:"http://localhost:3000"
            }
        ],
       
    },
    apis:["./routes/apis/*.js"]
}

const specs= swaggerJsDoc(options);




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
  
app.use(cors(corsOptions));
// built in middleware to handle urlencoded
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(jsend.middleware); 
app.use(cookieParser())


// api documentation route

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs));
 
//endpoints  
// app.get('*',checkLoggedUser);
app.use('/posts',postRoutes);
app.use('/comments',commentsRoutes);
app.use('/likes',likesRoutes);
app.use('/users',usersRouters);
app.use('/auth',authRouters);
app.use('/contacts',contactRouters);
app.use('/portfolios',portfoliosRoutes);

// page not found
app.all('*', (req, res) => {
    res.status(404);
    res.sendFile('404.html',{root:__dirname})
}); 

app.use(errorHandler);