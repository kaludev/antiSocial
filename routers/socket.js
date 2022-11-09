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
        socket.on("getMessagesBetween", async (targetUsername,last) =>{
            try{
              if(!targetUsername) throw new BadRequestError('targetUsername is required');
              const data = await getUserByUsername(targetUsername);
              if(!data) throw new BadRequestError('userNotValid');
              //TODO:check if target is friend
              last = last || 20;
              const messages = getMessagesBetween(socket.id,data.id,last);
              socket.emit('data', messages);
            }catch(err){
              socket.emit('error',err.message)
            }
        })
        socket.on("privateMessage", async (targetUsername, msg) => {
          try{
            //TODO:check if target is friend
          const data = await getUserByUsername(targetUsername);
          if(!data) throw new BadRequestError('userNotValid');
          if(socket.id ===  data.id) throw new BadRequestError('u cannot send messages to yourself')
          socket.to(data.id).emit("privateMessage", socket.request.user, msg,moment().format('h:mm a'));
          await insertMessage(socket.id,data.id,msg);
          }catch(err){
            socket.emit('error',err.message)
          }
        });
    });
}