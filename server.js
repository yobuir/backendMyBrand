const express = require('express');
const app= express();
const path= require('path');
const port=process.env.PORT || 3000;
const cors=require('cors');
const {logger } = require('./middleware/logEvents');

// third party middleware 
const whiteList= ['http://127.0.0.1:5500','http://localhost:3000'];
const corsOptions = {
    origin:function(origin,callback){
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error("You are not allowed to access this apis"));
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));
// custom middleware
app.use(logger);

// built in middleware to handle urlencoded
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// this is for rendering the static files
app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
      res.send('hello world');
});

app.get('/posts', (req, res) => {
      res.send('hello world');
});


app.post('/posts', (req, res) => {
      console.log(req.body);
});

app.get('/*', (req, res) => {
    res.sendFile('404.html',{root:__dirname})
});

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});