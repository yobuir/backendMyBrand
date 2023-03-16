const jwt= require('jsonwebtoken');
require('dotenv').config();
let maxAge = 3*60 * 24 *60;

const createToken= (id) =>{
    return jwt.sign({id},process.env.JWT_SCRET,{
        expiresIn:maxAge
    });
}
module.exports = createToken;