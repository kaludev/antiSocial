const {readFileSync,writeFileSync} = require('fs');

const express = require('express');
require('express-async-errors')
const http = require('http')
require('dotenv').config();
const socketio = require('socket.io')
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const userRouter = require('./routers/user')
const notFound= require('./middleware/NotFound')
const errorHandler = require('./middleware/errorHandler')
const jwtAuth = require('./middleware/socketJwtAuth')
const setupIO  = require('./routers/socket');

const app = express();
const server = http.createServer(app);
const io = socketio(server)
const mysql = require('./database/connect');

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
app.use(express.json())
app.use(express.static('public'))


app.use(helmet()) 
app.use(cors())
app.use(xss())
setupIO(io)
app.use(cookieParser())
io.use(jwtAuth);
app.use("/api/users",userRouter)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
server.listen(PORT,() =>{
    console.log(`app slusa na portu ${PORT}`)
})