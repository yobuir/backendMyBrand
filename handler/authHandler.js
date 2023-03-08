const createToken= (id) =>{
    return jwt.sign({id},'yobu new screet',{
        expiresIn:maxAge
    });
}

module.exports = createToken;