const jwt= require('jsonwebtoken');

let maxAge = 3*60 * 24 *60;

const createToken= (id) =>{
    return jwt.sign({id},'yobu new screet',{
        expiresIn:maxAge
    });
}
module.exports = createToken;