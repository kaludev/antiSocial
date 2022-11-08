


module.exports = (io) =>{
    io.on('connection', function(socket) {
        console.log('Authentication passed!');
        socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user,
        });
        socket.on("privateMessage", (anotherSocketId, msg) => {
          socket.to(anotherSocketId).emit("private message", socket.request.user, msg);
        });
    });
}