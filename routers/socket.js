


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
        socket.on("privateMessage", (anotherSocketId, msg) => {
          console.log(anotherSocketId + ' '+ msg)
          socket.to(anotherSocketId).emit("privateMessage", socket.request.user, msg);

        });
    });
}