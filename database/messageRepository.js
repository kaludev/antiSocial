const { uid } = require('uid');
const mysql = require('./connect');


const insertMessage = async (source,target,msg) =>{
    const id = uid(20);
   const data = await mysql.query('INSERT INTO userMessages(id,userSourceId,userTargetId,message) VALUES (?,?,?,?)',
    [   id,
        source,
        target,
        msg
    ]
   )
   await mysql.end();

    if (data.affectedRows === 0) throw new Error();
}
const getMessagesBeetween = async (source,target) =>{
    const data = await mysql.query('SELECT * from')
}
module.exports = {insertMessage};