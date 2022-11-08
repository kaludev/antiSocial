const moment = require('moment');
const {importUser,getUserByUsername,getUserByEmail,getUserById} = require('../database/userRepository');
const BadRequestError = require('../errors/BadRequestError');
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
        socket.on("privateMessage", async (anotherSocketId, msg) => {
          try{
          const data = await getUserById(anotherSocketId);
          if(!data) throw new BadRequestError('userNotValid');
          socket.to(anotherSocketId).emit("privateMessage", socket.request.user, msg,moment().format('h:mm a'));
          }catch(err){
            socket.emit('error',err.message)
          }
        });
    });
}