const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const userRouter = require('./routers/user')

const server = express();

if(process.env.DEV ==true){
    
}
server.use(express.json())
server.use(express.static('public'))

server.use(helmet())
server.use(cors())
server.use(xss())

server.use(cookieParser())
server.use("/api/users",userRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT,() =>{
    console.log(`Server slusa na portu ${PORT}`)
})