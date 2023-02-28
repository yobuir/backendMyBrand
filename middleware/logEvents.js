const fs= require('fs');
const uud= require('uuid');

const logger = (req,res,next) => {

    if (!fs.existsSync('./logs')){

        fs.mkdirSync('./logs', (error) => {
            console.log("Creating folder \t"+error);
        });
    }
    const logs=`${new Date}\t ${req.method} \t ${req.headers.origin} \t ${req.url} \n`
    fs.appendFile('./logs/log.txt', logs, (error)=>{
        console.log("Files Writing \t"+error);
    });

    next();
}

module.exports = {logger: logger}