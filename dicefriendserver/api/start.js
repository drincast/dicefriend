const express = require('express');
const http = require('http');
//const cors = require('cors');
//const socketIO = require('socket.io');

const {Socket} = require('./socket');
const {Player} = require('./class/player');

//iniciando app
const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);
//const io = socketIO(server);

/*VARIABLES GLOBALES*/
var players = [];


//intento de usar una clase para los sockets
const socket = new Socket();
socket.StartSockets(server, ...players);

console.log('players', players)



/*
io.on('connection', (socket) => {
    console.log('cliente conectado', socket.client.id);
    //console.log('server', socket.client.server.nsps[0]);
    socket.emit('messages', {msj: 'hola'});

    // socket.on('new-message', (data) => {
    //     messagesApp.push(data);
    
    //     io.sockets.emit('messages', messagesApp);
    // });
});
*/


//configuracion global de rutas
app.use( require('./route/index') );

//app.listen([port[, host[, backlog]]][, callback])
//backlog numero máximo de conexiones pendientes en la cola.
//cllback funcion que se invoca cuando el servidor se inici
//app.listen(port, 'localhost', 20, () => { console.log(`iniciado en ${port}`)});
server.listen(port, 'localhost', 20, () => { console.log(`iniciado en ${port}`)});