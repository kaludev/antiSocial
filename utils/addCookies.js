const createToken = require('./createToken')

const attachCookies = (res,userData) =>{
    const token = createToken(userData);

    res.cookie('token',token)
}

module.exports = attachCookies;