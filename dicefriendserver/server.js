const express = require('express');
const http = require('http');
//const cors = require('cors');
const socketIO = require('socket.io');

//
const { messages } = require('./utils');

let messagesApp = messages;

//aplicación express
let app = express();

//let port = normalizePort(process.env.PORT || 80);

//app.set('port', port);
app.use(express.static('public'));

// app.use(cors(
//     [
//         {origin: '10.0.75.1:3003'}
//     ]));


//app.use(cors())


//el servidor
let server = http.createServer(app);

//los sockets
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('cliente conectado', socket.client.id);
    //console.log('server', socket.client.server.nsps[0]);
    socket.emit('messages', messagesApp);

    socket.on('new-message', (data) => {
        messagesApp.push(data);
    
        io.sockets.emit('messages', messagesApp);
    });
});

server.listen(80, () => {
    console.log('Servidor up: localhost:80');
});

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

