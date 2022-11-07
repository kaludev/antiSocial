const BadRequestError = require('../errors/BadRequestError');
const EmailValidator = require('../utils/EmailValidator');
const ValidateEmail = require('../utils/EmailValidator')
const {uid} = require('uid')
const {StatusCodes} = require('http-status-codes')
const hashPassword = require('../utils/hashPassword')
const attachCookies = require('../utils/addCookies');
const {importUser,getUserByUsername,getUserByEmail} = require('../database/userRepository')

const mysql = require('../database/connect');
const UnauthenticatedError = require('../errors/UnauthenticatedError');
const comparePasswords = require('../utils/comparePassword');

const register = async (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    console.log(username);
    console.log(email);
    console.log(password)
    if(!username) throw new BadRequestError('Username cannot be empty');
    if(!email) throw new BadRequestError('Email cannot be empty');
    if(!password) throw new BadRequestError('Password cannot be empty');
    if(!ValidateEmail(email)) throw new BadRequestError('Email not valid');


    const hashedPassword = await hashPassword(password);
    const id = uid(20);
    await importUser(id,username,email,hashedPassword)
    
    attachCookies(res,{id,username,email});
    res.status(StatusCodes.OK).json({
        "ok":"true",
        "user":{
            "email":email,
            "username":username
        }
    })
}

const login = async (req,res) =>{
    const {username,password} = req.body;

    if (!username) throw new BadRequestError("Email/username is required");
	if (!password) throw new BadRequestError("Password is required");

    let data;
    if(ValidateEmail(username)){
       data = await getUserByEmail(username);
       if(!data) throw new UnauthenticatedError("User with provided email doesn't exists")
        
    }else{
        data = await getUserByUsername(username);
        if(!data) throw new UnauthenticatedError("User with provided username doesn't exists")
    }
    const isPasswordCorrect = await comparePasswords(password,data.password);
    if(!isPasswordCorrect) throw new UnauthenticatedError('Password is incorect')
 
    attachCookies(res,{id:data.id,username:data.username,email:data.email});
    res.status(StatusCodes.OK).json({
        ok:true,
        id:data.id,
        email:data.email,
        username: data.username
    })
}

const sendMessage = (req,res) =>{
    
}
module.exports = {register,login,sendMessage};