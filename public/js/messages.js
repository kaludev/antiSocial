var socket = io('http://localhost:5000');

const target = `luka.markovic1`;
const chatMessages = document.querySelector(`.chatMessages`)

// Connection succeeded
socket.on('success', async function(data) {
  console.log(data.message);
  console.log('user info: ' + data.user.id + ' username: '+ data.user.username);
})
socket.on('error', function(err) {
  throw new Error(err);
});

const chatForm = document.getElementById(`chatForm`);

//Join chatroom
//socket.emit(`joinRoom`, { username, room})

//Message from server
socket.on(`privateMessage`, (user,message,time) => {
  outputMessage(user,message,time);

  //Scroll on new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit(`privateMessage`, target,msg);

  //Clear input
  e.target.elements.msg.value = ``;
  e.target.elements.msg.focus();
}) 

//Output message to DOM
function outputMessage(user,message,time){
  console.log(user);
  console.log(message);
  console.log(time)
  const div = document.createElement(`div`);
  div.classList.add(`message`);
  div.innerHTML = `<p class="meta">${user.username} <span>${time}</span></p> <p class="text"> ${message} </p>`;
  document.querySelector(`.chatMessages`).appendChild(div);
}

const searchUser = async (event) =>{
  let filter = event.target.value;
  if(filter) {
    console.log(filter);
    const res = await fetch(`/api/users/search/${filter}`)
    console.log(res);
    const data = await res.json();
    console.log(data);
    const friends = await data.data;
    console.log(friends);
  }
}
document.getElementById(`search`).addEventListener(`keyup`, searchUser);

