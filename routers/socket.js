const moment = require('moment');
const {getUserByUsername,getUserById, getUserFriends, setStatus} = require('../database/userRepository');
const BadRequestError = require('../errors/BadRequestError');
const {insertMessage, getMessagesBetween} = require('../database/messageRepository')
module.exports = (io) =>{
    io.on('connection', async function(socket) {
        try {
          await setStatus(socket.id,true);
          const data = await getUserFriends(socket.id);
          data.forEach(async friend => {
            let id;
            if(friend.userTargetId === socket.id){
              id = friend.userSourceId;
            }else{
              id = friend.userTargetId;
            }
            const user = await getUserById(id);
            if(!user) throw new Error(`User undefdined`);
            socket.to(id).emit('activity',{username:socket.request.user.username, online:true});
          });
        }catch (err){
          socket.emit('error', err.message);
        }
        socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user,
          
        });
        socket.on("getMessagesBetween", async (targetUsername,last) =>{
            try{
              if(!targetUsername) throw new BadRequestError('targetUsername is required');
              const data = await getUserByUsername(targetUsername);
              if(!data) throw new BadRequestError('userNotValid');
              //TODO:check if target is friend
              last = last || 20;
              const messages = await getMessagesBetween(socket.id,data.id,last);
              socket.emit('messages',{username:targetUsername,messages: messages});
            }catch(err){
              socket.emit('error',err.message)
            }
        })
        socket.on("privateMessage", async (targetUsername, msg) => {
          try{
            //TODO:check if target is friend
            const data = await getUserByUsername(targetUsername);
            if(!data) throw new BadRequestError('userNotValid');
            if(!msg) throw new BadRequestError('message cannot be empty');
            if(socket.id ===  data.id) throw new BadRequestError('u cannot send messages to yourself')
            socket.to(data.id).emit("privateMessage", socket.request.user, msg,moment().format('h:mm a'));
            await insertMessage(socket.id,data.id,msg);
          }catch(err){
            socket.emit('error',err.message)
          }
        });
        socket.on('disconnect',  async () =>{
          try {
            await setStatus(socket.id,false);
            const data = await getUserFriends(socket.id);
            data.forEach(async friend => {
              let id;
              if(friend.userTargetId === socket.id){
                id = friend.userSourceId;
              }else{
                id = friend.userTargetId;
              }
              const user = await getUserById(id);
              if(!user) throw new Error(`User undefdined`);
              socket.to(id).emit('activity',{username:socket.request.user.username, online:false});
            });
          }catch (err){
            socket.emit('error', err.message);
          }
        })
    });
}