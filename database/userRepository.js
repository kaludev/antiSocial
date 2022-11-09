const UnauthenticatedError = require('../errors/UnauthenticatedError')
const mysql = require('./connect');
const {uid} = require('uid')

const importUser = async (id,username,email,hashedPassword) =>{
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
    const data = await mysql.query('SELECT * from user WHERE username = ?',[        
        username,
    ]);
    await mysql.end()
    if(data.length === 0){
        return undefined;
    }
    return data[0];
}

const getUserByEmail = async (email) =>{
    const data = await mysql.query('SELECT * from user WHERE email = ?',[        
        email,
    ]);
    await mysql.end()
    if(data.length === 0){
        return undefined;
    }
    return data[0];
}

const getUserById = async (id) =>{
    const data = await mysql.query('SELECT * from user WHERE id = ?',[        
        id,
    ]);
    await mysql.end()
    if(data.length === 0){
        return undefined;
    }
    return data[0];
}

const importUserFriend = async (source,target,accepted) =>{
    const id = await uid(20);
    const data = await mysql.query('INSERT INTO userFriends(id,userSourceId,userTargetId,accepted) VALUES (?, ?,?,?)',
    [
        id,
        source,
        target,
        accepted
    ]);
    await mysql.end()
    if (data.affectedRows === 0) throw new Error('data not inserted');
}

const acceptUserFriend = async (source, target) => {
    const data = await mysql.query('UPDATE userFriends SET accepted = 1 WHERE userSourceId = ? AND userTargetId = ?',
    [
        target,
        source
    ]);
    await mysql.end()
    if (data.affectedRows === 0) throw new Error('data not updated');
}   
module.exports = {importUser,getUserByUsername,getUserByEmail,getUserById,importUserFriend,acceptUserFriend}
