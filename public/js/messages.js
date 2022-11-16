document.querySelectorAll(`.targetProfile`).forEach(function(e){
  e.addEventListener('click', e => {
    window.location.href="./targetProfile.html";
  });
  });

document.querySelectorAll(`.openChat`).forEach(function(e){
e.addEventListener('click', e => {
  document.querySelector(`.messageBox`).classList.add('active');
});
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

let friendsDiv = document.querySelector('.mainFriends')
const setupRequests  =(async () =>{
  const res  = await fetch('/api/friends/getrequests')
  const data = await res.json();
  if(!data.ok) throw new Error(data.message);
  const requests = await data.data;
  requests.forEach(async request =>{
    const requestRes = await fetch(`/api/friends/getFriend/${request.userSourceId}`);
    const requestData = await requestRes.json();
    if(!requestData.ok) throw new Error(requestData.message);
    const el  = document.createElement('div');
    el.classList.add('friendRequest');
    const frequest = document.createElement('div');
    frequest.classList.add('mainFriendRequest');
    const pic = document.createElement('div');
    pic.classList.add('profilePic');
    pic.style.backgroundImage = `url(/api/users/profilePic/${requestData.username}`
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('mainFriendRequestName');
    const username = document.createElement('span');
    username.classList.add('targetProfile');
    username.innerHTML = requestData.username;
    const lastMessage = document.createElement('div')
    lastMessage.classList.add('mainLastMessage');
    lastMessage.innerHTML = 'wants to add you as friend';
    nameDiv.appendChild(username);
    nameDiv.appendChild(lastMessage);
    const accept = document.createElement('div');
    accept.classList.add('friendButton');
    accept.classList.add('friendAccept');
    accept.textContent = 'Accept';
    const decline = document.createElement('div');
    decline.classList.add('friendButton');
    decline.classList.add('friendDecline');
    decline.textContent = 'Decline'
    frequest.appendChild(pic);
    frequest.appendChild(nameDiv);
    frequest.appendChild(accept);
    frequest.appendChild(decline);
    const frequestcontent = document.createElement('div')
    const profileData = document.createElement('div');
    profileData.classList.add('profileData');
    profileData.classList.add('pt');
    const chats = document.createElement('div');
    chats.classList.add('profileChats');
    chats.innerHTML = '<span class="statistics">'+requestData.likes + '</span> likes';
    const Friends = document.createElement('div');
    Friends.innerHTML = '<span class="statistics">'+requestData.friendNum+ '</span> friends';
    profileData.appendChild(chats);
    profileData.appendChild(Friends);
    frequestcontent.appendChild(profileData);
    el.appendChild(frequest);
    el.appendChild(frequestcontent);
    friendsDiv.appendChild(el)
  })
})()
const setupFriends = (async () =>{
  const res  = await fetch('/api/friends/getfriends')
  const data = await res.json();
  if(!data.ok) throw new Error(data.message);
  const friends = await data.data;
  friends.forEach(async friend =>{
    const friendRes = await fetch(`/api/friends/getFriend/${friend.id}`);
    const friendData = await friendRes.json();
    if(!friendData.ok) throw new Error('error getting friend');
    const el = document.createElement('div');
    el.classList.add('mainFriend');
    el.classList.add('br');
    el.classList.add('openChat');
    const pic = document.createElement('div');
    pic.classList.add('profilePic');
    pic.style.backgroundImage = `url(/api/users/profilePic/${friendData.username})`;
    el.appendChild(pic);
    const name = document.createElement('div');
    name.classList.add('mainFriendName');
    const friendName = document.createElement('span');
    friendName.innerHTML = friendData.username;
    name.appendChild(friendName);
    const lastMessage = document.createElement('div');
    lastMessage.classList.add('mainLastMessage');
    await socket.emit('getMessagesBetween',friendData.username,1);
    name.appendChild(lastMessage);
    el.appendChild(name);
    const activity = document.createElement('div');
    activity.classList.add('activity');
    activity.style.backgroundColor = friendData.status?'green':'red';
    el.appendChild(activity);
    friendsDiv.appendChild(el);
  })
})()




socket.on('messages', data =>{
  console.log(data.username);
  console.log(data.messages);
  if(data.messages.length >0){
    document.querySelectorAll('.mainFriend').forEach(friend =>{
      if(friend.querySelector('.mainFriendName span').textContent === data.username ){
        friend.querySelector('.mainLastMessage').textContent = data.messages[0].message;
      }
    });
  }
})

socket.on('activity', data =>{
  console.log(data)
    document.querySelectorAll('.mainFriend').forEach(friend =>{
      console.log(friend.querySelector('.mainFriendName span').textContent )
      console.log(data.username)
      if(friend.querySelector('.mainFriendName span').textContent === data.username ){
        friend.querySelector('.activity').style.backgroundColor = data.online?'green':'red';
      }
    });
})
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
