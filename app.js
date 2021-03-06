require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
var io = require('socket.io')(http)
const PORT = process.env.PORT

app.use(cors())
// app.use(cors({credentials : true, origin: true}))

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// })

app.get('/', function(req, res){
    res.send('server is running');
})
  
const msg = `Server integration to client on progress`

io.on('connection', function(socket) {
    console.log('a player connected')

    socket.on('disconnect', function() {
        console.log('a player has been disconnected')
    })
  
    socket.on('addPlayer', payload => {   
        socket.emit('notifJoined', `${payload.player}, welcome to Focus In`)
        socket.broadcast.emit('notifJoined', `${payload.player} entered the lobby`)
        io.emit('playerAdded', payload.players)
      })

    socket.on('startOn', () => {
      io.emit('movePlayGamePage')
    })

    socket.on('updateScore', payload => {
      socket.broadcast.emit('updateScoreNih', payload)
    }) 

    socket.on('winner', payload => {
      io.emit('winnerNih', payload)
    })
    socket.emit('deletePlayers', () => {
      io.emit('deletePlayersNih')
    })
})

http.listen(PORT, function(){
    console.log(`server listening on : ${PORT}`)
})

