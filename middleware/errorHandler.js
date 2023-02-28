const errorHandler = (err,req,res,next) => {
    res.status(500).send(err.message);
    console.log(err.stack);
}

module.exports = errorHandler;