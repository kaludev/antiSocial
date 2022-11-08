


module.exports = (io) =>{
    io.on('connection', async function(socket) {
        console.log('Authentication passed!');
         socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user,
        });
        socket.on('join',async room =>{
          if(room === socket.request.user.id){
            await socket.join(room);
            console.log(socket.id + " now in rooms ", socket.rooms);
          }
        })
        socket.on("privateMessage", (anotherSocketId, msg) => {
          const rooms = io.of("/").adapter.rooms;
          socket.to(anotherSocketId).emit("private message", socket.request.user, msg);

        });
    });
}