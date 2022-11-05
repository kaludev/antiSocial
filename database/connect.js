require('dotenv').config()
const mysql = require('serverless-mysql')

const connection = mysql({
    config:{
        host: process.env.HOST,
        database: process.env.NAME,
        user:process.env.USER,
        password:process.env.PASSWORD
    }
})

module.exports = connection