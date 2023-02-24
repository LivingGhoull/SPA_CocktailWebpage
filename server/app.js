const express = require('express')
const app = express()
const mysql = require('mysql2')



app.post('/', (req, res) => {
    console.log('enterd')
    res.send('hello world post "/" ')
})



app.listen(3000), () => {
    console.log('server is running')
}