const express = require('express');
const app= express();
const path= require('path');
const port=process.env.PORT || 3000;
const {logger } = require('./middleware/logEvents');

// custom middleware
// app.use(logger);

// built in middleware to handle urlencoded
app.use(express.urlencoded({extended:false}))
// this is for rendering the static files
app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
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