

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
const clearList = (list) =>{
  while(list.children.length){
    list.removeChild(list.firstChild);
  }
}
const searchUser = async (event) =>{
  let filter = event.target.value;
  let list = document.querySelector('#list');
  
  if(filter) {
    const res = await fetch(`/api/users/search/${filter}`)
    const data = await res.json();
    const friends = await data.data;
    clearList(list);
    friends.forEach(user => {
      let listElement = document.createElement('li');
      let link = document.createElement('a');
      link.href = `/${user}`;
      let userData = document.createElement('div');
      userData.textContent = user;
      link.appendChild(userData);
      listElement.appendChild(link);
      list.appendChild(listElement);
    })
  }else{
    clearList(list);
  }
}
document.getElementById(`search`).addEventListener(`keyup`, searchUser);
/*
document.querySelector(`#sendFile`).addEventListener(`click`,async (e) =>{
  e.preventDefault();
  const file = document.querySelector('#inputFile').files[0];
  let formData = new FormData();
  formData.append('photo', file);
  const res = await fetch(`/api/users/upload`,{
    method: 'POST',
    body: formData
  })
})
*/
document.querySelector(`.openChat`).addEventListener('click', e => {
  document.querySelector(`.messageBox`).classList.add('active');
});


document.querySelector(`.messageBoxClose`).addEventListener('click', () => {
  document.querySelector(`.messageBox`).classList.remove('active');
})

document.querySelector(`.logout`).addEventListener('click', async () =>{
    const res = await fetch("/api/users/logout",{
      method: 'POST'
    });
		const json = await res.json();
		if(json.ok) window.location.href = "/login.html";
})