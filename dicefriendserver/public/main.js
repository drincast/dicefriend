var socket = io();

socket.connect('http://localhost:3002');

function render(data) {
	var html = data.map(function(elem, index){
    	return(`<div>
        		 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data){
    console.log('en cliente', data);
    render(data);
})

function addMessage(e) {
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    return false;
}