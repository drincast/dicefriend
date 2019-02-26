
var socket2 = io('https://appqueue.herokuapp.com');

console.log('socket2', socket2);

//metodos del socket
//Comando para establecer la comunicación
socket2.on('connect', () => {
    console.log('Conectado al servidor');
    console.log({
        id: socket2.id,
        uri: socket2.io.uri
    });
});

//Escuchar eventos
socket2.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});

//Escuchar información
socket2.on('EnviarMensaje', (resp) => {
    console.log('servidor: ', resp)
})

// socket2.on('SendLastTicket', (resp) => {
//     document.getElementById('lblNewTicket').innerHTML = resp.lastTicket;
// })


//metodos del front end

// document.getElementById('btnNewTicket').onclick = function () {
//     console.log('click');
//     socket2.emit('NextTicket', socket.id, (nextTicket) => {
//         console.log('desde Server nuevo ticket:', nextTicket);
//         document.getElementById('lblNewTicket').innerHTML = nextTicket;
//     });
// }

function crearturno(){
    console.log('click');
    socket2.emit('NextTicket', socket2.id, (nextTicket) => {
        console.log('desde Server nuevo ticket:', nextTicket);
        //document.getElementById('lblNewTicket').innerHTML = nextTicket;
    });
}

function atenderturno() {
    socket2.emit('RespondTicket', { desk: 'X?' }, function( resp ){
        console.log('resp', resp);

        // if(resp.number !== undefined){
        //     smallShowTicketRespond.innerHTML = 'ticket ' + resp.number;
        // }
        // else
        //     smallShowTicketRespond.innerHTML = 'no hay más tickets';
        
    });
}