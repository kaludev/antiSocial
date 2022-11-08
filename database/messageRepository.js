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
const getMessagesBetween = async (source,target) =>{
    const data = await mysql.query('SELECT * FROM userMessages WHERE (userSourceId = ? AND userTargetId = ?) OR (userTargetId = ? AND userSourceId = ?) ORDER BY createdAt ASC',
        [
        target,
        source,
        target,
        source
        ]
    )
    await mysql.end();
    console.log(data);
}

module.exports = {insertMessage,getMessagesBetween};