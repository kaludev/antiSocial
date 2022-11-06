const UnauthenticatedError = require('../errors/UnauthenticatedError')
const mysql = require('./connect');


const importUser = async (username,email,hashedPassword) =>{
    const id = uid(20);
    const data = await mysql.query("INSERT INTO user(id,username,email,password) VALUES (?,?,?,?);",
            [id,
            username,
            email,
            hashedPassword]
    )
    await mysql.end();

    if (data.affectedRows === 0) throw new Error();

}

const getUserByUsername = async (username) =>{
    const data = await mysql.query("SELECT * from user WHERE username=?",{
        username
    });
    await mysql.end()
    if(data.length === 0){
        return undefined;
    }
    return data[0];
}

const getUserByEmail = async (email) =>{
    const data = await mysql.query("SELECT * from user WHERE email=?",{
        email
    });
    await mysql.end()
    if(data.length === 0){
        return undefined;
    }
    return data[0];
}

module.exports = {importUser,getUserByUsername,getUserByEmail}
