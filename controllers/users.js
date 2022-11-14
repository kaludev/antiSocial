const BadRequestError = require('../errors/BadRequestError');
const EmailValidator = require('../utils/EmailValidator');
const ValidateEmail = require('../utils/EmailValidator')
const {uid} = require('uid')
const {StatusCodes} = require('http-status-codes')
const hashPassword = require('../utils/hashPassword')
const attachCookies = require('../utils/addCookies');
const {importUser,getUserByUsername,getUserByEmail,importUserFriend,acceptUserFriend,deleteUserFriend,getUserFriends, getUserById, getUserRequests, getLikes} = require('../database/userRepository')
const errorWrapper = require('../middleware/ErrorWrapper')
const path = require('path');
const fs = require('fs');
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
    await errorWrapper(importUser,req,res)([id,username,email,hashedPassword])
    
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
       data = await errorWrapper(getUserByEmail,req,res)([username]);
       if(!data) throw new UnauthenticatedError("User with provided email doesn't exists")
        
    }else{
        data = await errorWrapper(getUserByUsername,req,res)([username]);
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

const showMe = async (req,res) =>{
    const id = req.user.userId;
    const data = await await errorWrapper(getUserById,req,res)([id]);
    if(!data) throw new UnauthenticatedError("User with provided id doesn't exists")

    res.status(StatusCodes.OK).json({
        ok:true,
        id:id,
        email:data.email,
        username:data.username
    });
}

const logout = (req, res) => {
    res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
	});
	res.status(StatusCodes.OK).json({ ok: true });
}
const upload = async (req, res) => {
    res.status(StatusCodes.OK).json({
        ok:true,
        message: 'picture uploaded successfully'
    });
}

const like = async (req, res) => {

    
};

const dislike = async (req, res) => {

};

const profilePic = async (req,res) =>{
    let username = req.params.username
    if(!username) username = req.user.userName;
    const data = await await errorWrapper(getUserByUsername,req,res)([username])
    if(await fs.existsSync(path.join('images',data.id,'profile.png'))){
    const direc = await path.join('images',data.id);
    await res.status(StatusCodes.OK).sendFile('profile.png',{root:direc});
    }else{
        const direc = 'images';
        await res.status(StatusCodes.OK).sendFile('profile.png',{root:direc});
    }
}
const addFriend = async (req,res) =>{
    username = req.params.username;
    console.log(username)
    console.log(req.user.userId)

    const data = await await errorWrapper(getUserByUsername,req,res)([username]);
    if(!data) throw new BadRequestError(`User not found: ${username}`);
    if(!username) throw new BadRequestError('Username is required');
    if(data.id == req.user.userId) throw new BadRequestError('you cannot be friends with yourself')
    await await errorWrapper(importUserFriend,req,res)([req.user.userId,data.id,'false']);
    res.status(StatusCodes.OK).json({
        ok:true,
        username: username
    })
}

const acceptFriend = async (req, res) =>{
    username = req.params.username;
    if(!username) throw new BadRequestError('Username is required');
    const data = await await errorWrapper(getUserByUsername,req,res)([username]);
    if(!data) throw new BadRequestError(`User not found: ${username}`);
    await await errorWrapper(acceptUserFriend,req,res)([req.user.userId,data.id]);
    res.status(StatusCodes.OK).json({
        ok:true,
        username: username
    })
}


const deleteFriend = async (req, res) => {
    username = req.params.username;
    if(!username) throw new BadRequestError('Username is required');
    const data = await errorWrapper(getUserByUsername,req,res)([username]);
    if(!data) throw new Error(`User not found: ${username}`);
    await deleteUserFriend(req.user.userId,data.id);
    res.status(StatusCodes.OK).json({
        ok:true,
        username: username
    })
}

const getFriends = async (req,res) =>{
    const data = await (await errorWrapper(getUserFriends,req,res))([req.user.userId]);
    let friends = [];
    data.forEach(friend =>{
        let id;
        if(friend.userSourceId === req.user.userId){
            id = friend.userTargetId;
        }else{
            id = friend.userSourceId;
        }
        friends.push({
            id: id
    })
    });
    res.status(StatusCodes.OK).json({
        ok:true,
        data: friends
    })
}

const getRequests = async (req, res) => {
    const data = await (await errorWrapper(getUserRequests,req,res))([req.user.userId]);
    res.status(StatusCodes.OK).json({
        ok:true,
        data: data
    })
}
const getFriend = async (req,res) =>{
    const id = req.params.id;
    const user = await (await errorWrapper(getUserById,req,res))([id]);
    if(!user) throw new BadRequestError(`User not found: ${id}`);
    const likes = await (await errorWrapper(getLikes,req,res))([id]);
    likesNum = likes.length;
    res.status(StatusCodes.OK).json({
        ok:true,
        username: user.username,
        status:user.status,
        likes:likesNum
    });
}
const search = async (req,res) =>{
    const input = req.params.input;
    const id = req.user.userId;
    const data = await mysql.query(`SELECT username,UPPER(username) as cs from user WHERE (UPPER(username) LIKE UPPER(?) AND NOT id = ?) ; `,
    [
        '%'+input+'%',
        id
    ]);
    await mysql.end()
    let score = []
    data.forEach(user =>{
        let scoreNum = -user.cs.length/2 - 2*(user.cs.indexOf(input.toUpperCase()));
        score.push({user,scoreNum});
    })
    score.sort((a,b) => {return b.scoreNum - a.scoreNum})
    let result = score.map(a => a.user.username);
    
    res.status(StatusCodes.OK).json({
        ok:true,
        data: result,
    })
}


module.exports = {register,login,showMe,logout,upload,like,dislike,profilePic,addFriend,acceptFriend,deleteFriend,getFriends,getRequests,getFriend,search};