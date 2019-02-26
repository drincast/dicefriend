/* INVOCACIÓN NORMAL PARA EL MISMO DOMINIO
var socket = io();
var params = new URLSearchParams(window.location.search);
/**/


/* TEST CONECTANDO DIRECTAMENTE A LA URL, DIFERENTE DOMINIO */
var socket = io();
var params = new URLSearchParams(window.location.search);
socket.connect('http://localhost:3002');
/**/

/* VARIABLES GLOBALES */
var player = {};

//función para ejecutar inicialmente cuando ya se ha cargado el DOM de la pagina
function init(){
    var messageErr = '';
    var err = false;

    try {        
        if( !params.has('nickname')){
            messageErr = 'El nickname es requerido';
            err = true;
        }

        if( !params.has('cash')){            
            messageErr = messageErr + ' \n ' + 'El campo efectivo es requerido';
            err = true;
        }

        if(err)
            throw messageErr;
    
        player = {nickname: params.get('nickname'), cash: params.get('cash')};
    } catch (error) {
        console.error(error);
        window.location = 'index.html';
    }    
}

//Escuchas de eventos de socket desde el servidor
socket.on('connect', function(resp) {
    console.log('Asociado al juego !!! :)');
     
    socket.emit('addPlayer', player);
});

socket.on('info_socket', function(resp) {
    console.log('info_socket', resp);
});
