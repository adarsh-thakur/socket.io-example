const express = require('express');
const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'))

app.get('/',(req,res)=>res.sendFile(__dirname + "/index.html"));

io.on('connection',(socket)=>{
    console.log("user connected");
    socket.on('message-sent',(msg)=>{
        io.emit('message-recieved', msg);
    })
    socket.on('disconnect',()=>console.log("User disconnected"));
});


http.listen(port,()=>console.log(`on port ${port}`));