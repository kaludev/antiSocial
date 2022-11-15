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

    if (data.affectedRows === 0) throw new Error('query error');
}
const getMessagesBetween = async (source,target,last) =>{
    let data
    try{
        data = await mysql.query('SELECT message FROM userMessages WHERE (userSourceId = ? AND userTargetId = ?) OR (userTargetId = ? AND userSourceId = ?) ORDER BY createdAt ASC LIMIT ? ',
            [
            target,
            source,
            target,
            source,
            last
            ]
        )
        await mysql.end();
    }catch(err){
        console.error(err);
        data = [];

    }finally{
        return data;
    }
}

module.exports = {insertMessage,getMessagesBetween};