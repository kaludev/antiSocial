require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = ({id,username}) => {
    return jwt.sign({userId:id,userName:username},process.env.JWT_SECRET,{expiresIn:'6d'});
}