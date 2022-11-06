const bcrypt = require('bcryptjs')

module.exports = async (password, hashPassword) => {
    const correct = await bcrypt.compare(password,hashPassword);
    return correct;
}