require('dotenv').config()
const express = require('express');
const socket = require('socket.io');
const cors = require('cors')
const path = require('path')
const app = express();
app.use(express.json());
app.use(cors({origin:'*'}));
// app.use(function(req,res,next) {
//     console.log(req.headers);
//     // if(req.headers)
// })
let x = 0;

const server = app.listen(3000,()=> {
    console.log("started at 3000")
})

const io = socket(server,{
    cors: {
        origins: ['http://localhost:4200']
    }
});

io.sockets.on('connection',(socket) => {
    // console.log(`new connection id: ${socket.id}`);
    sendData(socket);
})

function sendData(socket) {
     if(x === 0) {
       socket.emit('data1', Array.from({length:8},()=> Math.floor(Math.random() *290) + 10));
         x +=1
     } else if(x === 1 ) {
         socket.emit('data2', Array.from({length:8},()=> Math.floor(Math.random() *590) + 10));
         x +=1
    } else {
        socket.emit('data3', Array.from({length:8},()=> Math.floor(Math.random() *590) + 10));
        x  = 0
    }

    // console.log(`data is ${x}`);
    setTimeout(() => {
        sendData(socket)
    },500 )
}
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"dist")))
    app.use("**",(req,res) => {
        res.redirect('/')
    })
} else {
    app.get('/api',(req,res) => {
        res.send("local api")
    })
    app.use("**",(req,res) => {
        res.redirect('/api')
    })
   
}
