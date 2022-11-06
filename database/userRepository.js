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

const getUserByUsername = (username) =>{
    //const data = await mysql.query("SELECT * ")
}

module.exports = {importUser,getUserByUsername}
