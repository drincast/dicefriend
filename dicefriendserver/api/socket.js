const socketIO = require('socket.io');

const {Player} = require('./class/player');
const { DataGameSinglenton } = require('./class/DataGameSinglenton');

class Socket {    
    constructor(){
        this.io = null;
        this.objDataGame = new DataGameSinglenton();
        this.i2 = new DataGameSinglenton(); //sera la misma instancia anterior
    }

    StartSockets(server){
        if(server){
            this.io = socketIO(server);

            this.io.on('connection', (socket, data) => {
                console.log(data)
                this.ConnetionClient(socket);

                socket.on('disconnect', () => {this.DisconnectClient(socket)});

                socket.on('addPlayer', (data) => {this.AddPlayer(socket, data)});

                socket.on('modplayer', (data) => {this.ModPlayer(socket, data)});

                socket.on('getplayer', (data) => {this.GetPlayer(socket, data)});

                socket.on('testSocket', (data) => {this.TestSocket(socket, data)});
            });
        }
        else{
            console.error('debe especificar un servidor para iniciar los sockets');
        }
    }

    ConnetionClient(socket){
        //console.log('cliente conectado', socket.client.id);
        //console.log('cliente conectado', socket.client.id, socket.nsp.connected);
        //console.log('server', socket.client.server.nsps[0]);
        socket.emit('info_server', { message: 'te haz conectado con exito !!!, aaahhh jugarrr !!!!' });

        // console.log('info objDataGame', this.objDataGame.GetMetaDataGame())
        // console.log('info i2', this.i2)
        //console.log('init objDataSinglenton', objDataSinglenton)
    }

    DisconnectClient(socket){
        if(socket.noInTheSystem === undefined){
            console.log(`jugador deconectado ${this.objDataGame.GetPlayerXId(socket.client.id).nickname}`, );
            this.objDataGame.RemovePlayer(socket.client.id);
            console.log('remove objDataGame', socket.client.id, this.objDataGame)
        }
        else{
            console.log('removing client due to an error');
        }
    }

    AddPlayer(socket, data){
        let player = new Player();
        let existsPlayer = this.objDataGame.GetPlayerXNickname(data.nickname) === undefined ? false : true;

        console.log('respuesta: ', data.nickname, existsPlayer);

        if(!existsPlayer){
            player.nickname = data.nickname;
            player.id = socket.client.id;        
            player.cash = data.cash;

            this.objDataGame.AddPlayer(player);

            let msg = {
                isError: false,
                txtMessage: 'te haz conectado con exito !!!, aaahhh jugarrr !!!!'
            }

            // console.log('add objDataGame', this.objDataGame)
            // console.log('add i2', this.i2)
            // console.log('add objDataSinglenton', objDataSinglenton)

            this.SendMessageToClient(socket, msg);
        } else{
            socket.noInTheSystem = true;
            socket.disconnect();

            let msg = {
                isError: true,
                codErr: '00000',
                txtMessage: 'El nickname ya existe'
            }

            this.SendMessageToClient(socket, msg);
        }
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

    SendMessageToClient(socket, data){
        socket.emit('ServerSendMessage', data);
    }

    TestSocket(socket, data){
        console.log('objDataGame', this.objDataGame)
        //console.log('i2', this.i2); //sera la misma instancia anterior)
        console.log('clients', socket.nsp.server.engine.Clients)
        console.log('clients', socket.nsp.server.httpServer._connections, socket.nsp.server.eio.clientsCount, socket.nsp.server.engine.clientsCount)
        //console.log('clients', socket.nsp.server.httpServer._connections, socket.nsp.server.eio.clientsCount)
        console.log('clients', Object.keys(socket.nsp.server.engine.clients))
        //
    }
}

module.exports = {
    Socket
}