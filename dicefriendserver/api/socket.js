const socketIO = require('socket.io');

const {Player} = require('./class/player');
let { DataGameSinglenton } = require('./class/DataGameSinglenton');

class Socket {    
    constructor(){
        this.io = null;
        this.objDataGame = new DataGameSinglenton();
        //this.i2 = new DataGameSinglenton(); //sera la misma instancia anterior
    }

    StartSockets(server){
        if(server){
            this.io = socketIO(server);

            this.io.on('connection', (socket) => {
                this.ConnetionClient(socket);

                socket.on('disconnect', () => {this.DisconnectClient(socket)});

                socket.on('addPlayer', (data) => {this.AddPlayer(socket, data)});

                socket.on('modplayer', (data) => {this.ModPlayer(socket, data)});

                socket.on('getplayer', (data) => {this.GetPlayer(socket, data)});

                //socket.on('revomeplayer', (data) => {this.RemovePlayer(socket, data)});
            });
        }
        else{
            console.error('debe especificar un servidor para iniciar los sockets');
        }
    }

    ConnetionClient(socket){
        console.log('cliente conectado', socket.client.id);
        //console.log('cliente conectado', socket.client.id, socket.nsp.connected);
        //console.log('server', socket.client.server.nsps[0]);
        socket.emit('info_server', { message: 'tas haz conectado con exito !!!, aaahhh jugarrr !!!!' });

        console.log('info objDataGame', this.objDataGame.GetMetaDataGame())
        console.log('info i2', this.i2)
        //console.log('init objDataSinglenton', objDataSinglenton)
    }

    DisconnectClient(socket){
        console.log(`jugador deconectado ${this.objDataGame.GetPlayerXId(socket.client.id).nickname}`, );
        this.objDataGame.RemovePlayer(socket.client.id);
        console.log('remove objDataGame', socket.client.id, this.objDataGame)
    }

    AddPlayer(socket, data){
        let player = new Player();

        player.id = socket.client.id;
        player.nickname = data.nickname;
        player.cash = data.cash;

        this.objDataGame.AddPlayer(player);

        console.log('add objDataGame', this.objDataGame)
        console.log('add i2', this.i2)
        //console.log('add objDataSinglenton', objDataSinglenton)
    }

    ModPlayer(socket, data){
        this.i1.players.push(data);
        console.log('mod objDataGame', this.objDataGame)
        console.log('mod i2', this.i2)
        //console.log('mod objDataSinglenton', objDataSinglenton)
    }

    GetPlayer(socket, data){
        console.log('mod objDataGame', this.objDataGame)
        console.log('mod i2', this.i2)
        //console.log('get objDataSinglenton', objDataSinglenton)
    }

    
}

module.exports = {
    Socket
}