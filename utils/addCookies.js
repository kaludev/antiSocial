const createToken = require('./createToken')

const attachCookies = (res,userData) =>{
    const token = createToken(userData);

    res.cookie('token',token, {
        httpOnly: true,
  })
}

module.exports = attachCookies;