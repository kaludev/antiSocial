var socket = io('http://localhost:5000');

const target = `3b0d22d84586e0200c9c`;
// Connection succeeded
socket.on('success', async function(data) {
  console.log(data.message);
  console.log('user info: ' + data.user.id + ' username: '+ data.user.username);
  socket.emit('join', data.user.id);
})
socket.on('error', function(err) {
  throw new Error(err);
});

const chatForm = document.getElementById(`chatForm`);


//Message from server
socket.on(`privateMessage`, user,message => {
  outputMessage(message)
})

//Message submit
chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit(`privateMessage`, target,msg);
})
