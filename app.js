const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const http = require('http').createServer(app)
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('server is running')    
})

const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log(`server listening on : ${PORT}`);
    
})

io.on('connection', socket => {
    socket.emit('connect', 'server to client connect')
})