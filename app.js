const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT

const http = require('http').createServer(app)

http.listen(PORT, function(){
    console.log(`server listening on : ${PORT}`);
    
})