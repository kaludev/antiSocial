
const jwt = require('jsonwebtoken')
const { getUserById } = require('../database/userRepository');
const UnauthenticatedError = require('../errors/UnauthenticatedError');
require('dotenv').config();
function getCookie(socket,cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(socket.request.headers.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
     if (val.indexOf(name) === 0) res = val.substring(name.length);
     })
  return res;
}

module.exports = async (socket,next) =>{
  
  const token = await getCookie(socket,'token')
  if(!token) throw new UnauthenticatedError('You aren\'t logged in');
  try{
      data = jwt.verify(token,process.env.JWT_SECRET)
      socket.request.user = {id: data.userId,username: data.userName};
      socket.id = data.userId;
      next()
  }catch{
    console.log('error')
      throw new UnauthenticatedError('You aren\'t logged in')
  }
}
