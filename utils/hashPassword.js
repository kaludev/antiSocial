const bCrypt = require('bcryptjs')

module.exports = async (password) =>{
    const salt = await bCrypt.genSalt(10);
    const hashedPassword = await bCrypt.hash(password,salt);
    return hashedPassword;
}