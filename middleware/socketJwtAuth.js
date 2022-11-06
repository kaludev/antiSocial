
const jwtAuth = require('socketio-jwt-auth');
const { getUserById } = require('../database/userRepository');
const UnauthenticatedError = require('../errors/UnauthenticatedError');
require('dotenv').config();

module.exports = jwtAuth.authenticate({
    secret: process.env.JWT_SECRET   
  }, async function(user, done) {
    if(!user) return done(null, false, 'token is missing');
    const userId = user.userId;
    const userName = user.userName;
    const data = await getUserById(userId);
    if(!data){
        return done(null, false, 'user does not exist');
    }
    return done(null, data);
    done()
})
