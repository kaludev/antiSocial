var socket = io('http://localhost:5000');
const target = `3b0d22d84586e0200c9c`;
const chatMessages = document.querySelector(`.chatMessages`)

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

//Message from server
socket.on(`privateMessage`, target,message => {
  console.log(message);
  outputMessage(message)

  //Scroll down on message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit(`privateMessage`, msg);
});

//Output message to DOM
function outputMessage(message){
  const div = document.createElement(`div`);
  div.classList.add(`message`);
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
    repudiandae.
  </p>`;
  document.querySelector(`.chatMessages`).appendChild(div);
}