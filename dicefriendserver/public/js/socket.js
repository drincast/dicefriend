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
    console.log('Asociando al juego ...');
     
    socket.emit('addPlayer', player);
    //socket.emit('addPlayer', player, AddPlayerToDivLstPlayer);
});

socket.on('ServerSendMessage', function(resp) {
    if(resp.isError === false){
        console.log(resp.txtMessage);            
    }
    else{
        console.log('resp', resp); 
        alert(resp.txtMessage);
        socket = null;
        window.location = 'index.html';
    }
});

socket.on('info_socket', function(resp) {
    console.log('info_socket', resp);
});

socket.on('render_Players', function(resp){
    var ulLstPlayers = document.getElementById('ulLstPlayers');

    while (ulLstPlayers.firstChild) {
        ulLstPlayers.removeChild(ulLstPlayers.firstChild);
      }

    if(resp.length > 0){
        resp.forEach(element => {
            CreateElementHTMLToAddLstPlayers('li', ulLstPlayers, element);
        });
    }
})

//functions
function CreateElementHTMLToAddLstPlayers(type, containerElement, data){
    // var element = document.createElement(type);
    // var spanCash = document.createElement('span');

    // element.innerHTML = data.nickname;
    // element.id = data.id
    // spanCash.innerHTML = data.cash;

    // element.appendChild(spanCash);
    // containerElement.appendChild(element);

    var element = document.createElement(type);    
    var spanCash = document.createElement('span');

    element.innerHTML = data.nickname;
    element.id = data.id
    spanCash.innerHTML = data.cash;
    spanCash.classList.add("text-warning");
    spanCash.classList.add("pl-1");
    element.classList.add('bg-success');
    element.classList.add('border-bottom');
    element.classList.add('text-light');
    
    
    element.appendChild(spanCash);
    containerElement.appendChild(element);
}


//functions anonymous
var AddPlayerToDivLstPlayer = function(data){
    var divLstPlayers = document.getElementById('divLstPlayers');
    var ulLstPlayers = document.getElementById('ulLstPlayers');
    
    divLstPlayers.style.display = "block";

    //add to list
    
    CreateElementHTMLToAddLstPlayers('li', ulLstPlayers, data);

    console.log('add player !!')
}

