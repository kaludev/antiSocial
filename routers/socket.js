


module.exports = (io) =>{
    io.on('connection', function(socket) {
        console.log('Authentication passed!');
        socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user,
        });
        socket.on("private message", (anotherSocketId, msg) => {
          socket.to(anotherSocketId).emit("private message", socket.id, msg);
        });
    });
}