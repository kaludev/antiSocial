


module.exports = (io) =>{
    io.on('connection', function(socket) {
        console.log('Authentication passed!');
        // now you can access user info through socket.request.user
        // socket.request.user.logged_in will be set to true if the user was authenticated
        socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user
        });
      });
      
}