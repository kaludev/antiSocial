const UnauthenticatedError = require("../errors/UnauthenticatedError");
const jwt = require('jsonwebtoken')

const authentication = async (req,res,next) =>{
    token = req.cookies.token;

    if(!token) throw new UnauthenticatedError('You aren\'t logged in');
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId: data.userId,userName: data.userName};
        next()
    }catch{
        throw new UnauthenticatedError('You aren\'t logged in')
    }
}

module.exports = authentication;