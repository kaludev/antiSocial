
 
  var socket = io('http://localhost:5000');

  socket.on('error', function(err) {
    throw new Error(err);
  });
  // Connection succeeded
  socket.on('success', function(data) {
    console.log(data.message);
    console.log('user info: ' + data.user.id + ' username: '+ data.user.username);
    socket.join(data.user.id)
  })
 