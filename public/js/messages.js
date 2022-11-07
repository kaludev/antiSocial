const value = ('; '+document.cookie).split(`; COOKIE_NAME=`).pop().split(';')[0];
console.log(document.cookie)
  // You should add auth_token to the query when connecting
  // Replace THE_JWT_TOKEN with the valid one
  var socket = io('http://localhost:9000', {query: `auth_token=${value}`});
  // For socket.io v3 you must use 'auth' object in place of 'query'
  // var socket = io('http://localhost:9000', {auth: 'auth_token=THE_JWT_TOKEN'});
  // Connection failed
  socket.on('error', function(err) {
    throw new Error(err);
  });
  // Connection succeeded
  socket.on('success', function(data) {
    console.log(data.message);
    console.log('user info: ' + data.user);
    console.log('logged in: ' + data.user.logged_in)
  })
