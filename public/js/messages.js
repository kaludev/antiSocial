var socket = io('http://localhost:5000');

// Connection succeeded
socket.on('success', function(data) {
  console.log(data.message);
  console.log('user info: ' + data.user.id + ' username: '+ data.user.username);
  socket.join(data.user.id)
})
socket.on('error', function(err) {
  throw new Error(err);
});

const chatForm = document.getElementById(`chatForm`);

socket.on(`message`, message => {
  console.log(message);
})

//Message submit
chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit(`chatMessage`, msg);
})
