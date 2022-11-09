const moment = require('moment');
const {importUser,getUserByUsername,getUserByEmail,getUserById} = require('../database/userRepository');
const BadRequestError = require('../errors/BadRequestError');
const {insertMessage, getMessagesBetween} = require('../database/messageRepository')
module.exports = (io) =>{
    io.on('connection', async function(socket) {
        console.log('Authentication passed!');
         socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user,
        });
        socket.on('join',async room =>{
          if(room === socket.request.user.id){
            console.log(socket.id + " now in rooms ", socket.rooms);
          }
        })
        socket.on("getMessagesBetween", async (targetId,last) =>{
              if(!targetId) throw new BadRequestError('targetID is required');
              //TODO:check if target is friend
              last = last || 20;
              const data = getMessagesBetween(socket.id,targetID,last);
              socket.emit('data', data);
        })
        socket.on("privateMessage", async (targetId, msg) => {
          try{
          const data = await getUserById(targetId);
          if(!data) throw new BadRequestError('userNotValid');
          if(socket.id === targetId) throw new BadRequestError('u cannot send messages to yourself')
          socket.to(targetId).emit("privateMessage", socket.request.user, msg,moment().format('h:mm a'));
          await insertMessage(socket.id,targetId,msg);
          }catch(err){
            socket.emit('error',err.message)
          }
        });
    });
}