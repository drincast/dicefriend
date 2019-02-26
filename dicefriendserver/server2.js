const express = require('express');
const http = require('http');
//const cors = require('cors');
const socketIO = require('socket.io');

//
const { messages } = require('./utils');

let messagesApp = messages;

//aplicación express
let app = express();

//app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

//app.use(cors())


//el servidor
let server = http.createServer(app);

//los sockets
let io = socketIO(server);

// io.on('connection', (socket) => {
//     console.log('cliente conectado', socket.client.id);
//     //console.log('server', socket.client.server.nsps[0]);
//     socket.emit('messages', messagesApp);

//     socket.on('new-message', (data) => {
//         messagesApp.push(data);
    
//         io.sockets.emit('messages', messagesApp);
//     });
// })

server.listen(3003, '10.0.75.1', () => {
    console.log('Servidor up: 10.0.75.1:3003');
});

