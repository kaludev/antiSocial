const { StatusCodes } = require("http-status-codes");
const { getUserRequests, getUserById, getUserByUsername, importUserFriend, getLikes, acceptUserFriend, getUserFriends, deleteUserFriend, areUsersFriends, isRequestSent, isRequestPending } = require("../database/userRepository");
const BadRequestError = require("../errors/BadRequestError");
const errorWrapper = require("../middleware/ErrorWrapper");


const addFriend = async (req,res) =>{
    username = req.params.username;
    if(!username) throw new BadRequestError('Username is required');
    const data = await (await errorWrapper(getUserByUsername,req,res))([username]);
    if(!data) throw new BadRequestError(`User not found: ${username}`);
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
    const sourceId = req.user.userId;
    const id = req.params.id;
    const data = await (await errorWrapper(getUserFriends,req,res))([id]);
    const user = await (await errorWrapper(getUserById,req,res))([id]);
    if(!user) throw new BadRequestError(`User not found: ${id}`);
    const likes = await (await errorWrapper(getLikes,req,res))([id]);
    const areFriends = await (await errorWrapper(areUsersFriends,req,res))([sourceId,id]);
    const isRequestSended = await (await errorWrapper(isRequestSent,req,res))([sourceId,id]);
    const isReqPending = await (await errorWrapper(isRequestPending,req,res))([sourceId,id])
    likesNum = await likes.length;
    res.status(StatusCodes.OK).json({
        ok:true,
        username: user.username,
        status:user.status,
        likes:likesNum,
        areFriends:areFriends,
        isRequestPending:isReqPending,
        isRequestSent:isRequestSended,
        friendNum: data.length
    });
}


const getFriendByUsername = async (req,res) =>{
    const sourceId = req.user.userId;
    const username = req.params.username;
    const user = await (await errorWrapper(getUserByUsername,req,res))([username]);
    if(!user) throw new BadRequestError(`User not found: ${username}`);
    const id = user.id;
    const likes = await (await errorWrapper(getLikes,req,res))([id]);
    const areFriends = await (await errorWrapper(areUsersFriends,req,res))([sourceId,id]);
    const isRequestSended = await (await errorWrapper(isRequestSent,req,res))([sourceId,id]);
    const isReqPending = await (await errorWrapper(isRequestPending,req,res))([sourceId,id])
    likesNum = await likes.length;
    res.status(StatusCodes.OK).json({
        ok:true,
        id: id,
        status:user.status,
        likes:likesNum,
        areFriends:areFriends,
        isRequestPending:isReqPending,
        isRequestSent:isRequestSended
    });
}

module.exports = {addFriend,acceptFriend,deleteFriend,getFriends,getRequests,getFriend,getFriendByUsername}