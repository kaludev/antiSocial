const BadRequestError = require('../errors/BadRequestError');
const EmailValidator = require('../utils/EmailValidator');
const ValidateEmail = require('../utils/EmailValidator')
const {uid} = require('uid')
const {StatusCodes} = require('http-status-codes')
const hashPassword = require('../utils/hashPassword')
const attachCookies = require('../utils/addCookies');
const {importUser,getUserByUsername} = require('../database/userRepository')

const mysql = require('../database/connect')
const register = async (req,res) =>{
    const {username,email,password} = req.body;
    if(!username) throw new BadRequestError('Username cannot be empty');
    if(!email) throw new BadRequestError('Email cannot be empty');
    if(!password) throw new BadRequestError('Password cannot be empty');
    if(!ValidateEmail(email)) throw new BadRequestError('Email not valid');


    const hashedPassword = await hashPassword(password);
    
    
    attachCookies(res,{id,username,email});
    res.status(StatusCodes.OK).json({
        "status":"ok",
        "user":{
            "email":email,
            "username":username
        }
    })
}

const login = async(req,res) =>{
    const {username,password} = req.body;
}
module.exports = {register,login};