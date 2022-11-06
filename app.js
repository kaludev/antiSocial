const {readFileSync,writeFileSync} = require('fs');

const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');


const userRouter = require('./routers/user')

const notFound= require('./middleware/NotFound')
const errorHandler = require('./middleware/errorHandler')

const server = express();
const mysql = require('./database/connect')
if(process.env.DEV == "true"){
    const data = readFileSync('./database/reset.sql','utf8');
    console.log(data)
    const dataArray = data.split('\r\n');
    dataArray.forEach(line =>{
        if(line.length !=0){
            mysql.query(line);
        }
    }) 
    
    console.log('tabele kreirane')
}
server.use(express.json())
server.use(express.static('public'))

server.use(helmet()) 
server.use(cors())
server.use(xss())

server.use(cookieParser())
server.use("/api/users",userRouter)

server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT || 5000
server.listen(PORT,() =>{
    console.log(`Server slusa na portu ${PORT}`)
})