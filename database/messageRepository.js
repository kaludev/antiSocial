const { uid } = require('uid');
const mysql = require('./connect');


const insertMessage = async (source,target,msg) =>{
    const id = uid(20);
   await mysql.query('INSERT INTO userMessages(id,userSourceId,userTargetId,message) VALUES (?,?,?,?)',
    [id,source,target,msg]
   )
}