const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const path = require('path');

const socketIO = require('socket.io');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//notas: https://firebase.google.com/docs/functions/local-emulator?hl=es-419
//https://us-central1-dicefriend-x.cloudfunctions.net/addMessage
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    console.log(this.addMessage)

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //return res.redirect(303, snapshot.ref.toString());

        let msg = `Metodo: ${req.method}, valor: ${req.query.text}, this: ${this.addMessage}`

        return res.status(200).send(msg);
    });
});

//app.use(cors());
app.use(cors(
    [
        {origin: 'localhost:3050'}
    ]));

const publicPath = path.resolve(__dirname, '../../test');

//app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/hola', (req, res) => {
    let imp = `hola express: ${publicPath}`;
    console.log(imp+ '---')
    res.send(imp);
});

//app.use(express.static(publicPath));

app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    next();
})

//para que se ancle a las funciones de firebase
exports.app = functions.https.onRequest(app);

//socketIO.set('transports', [ 'websocket' ]);

//HTTP Server 
//var server = require('http').createServer(app).listen(8888); 
//var io = require('socket.io').listen(server); 
//Allow Cross Domain Requests 
//io.set('transports', [ 'websocket' ]); 

// socketIO.listen(functions.https).on('connection', client => {
//     console.log('Usuario conectado');

//     client.on('disconnect', () => {
//         console.log('usuario se desconecto');
//     });

//     client.on('EnviarMensaje', (data, callback) => {
//         console.log(data);

//         client.broadcast.emit('EnviarMensaje', data);
//     });

//     client.emit('EnviarMensaje', {
//         user: 'Admin',
//         message: 'bienvenido a la app'
//     });
// });

// app.listen(3002, () => {
//   console.log(`Ejecutando en puerto: ${3002}`);
// });

let metadata = {};
const http = require('http');
//let server = http.createServer(app);
//let port = process.env.PORT || 3002;
let port = process.env.PORT;

metadata.port = port;
metadata.path = __dirname;

//let io = socketIO(server);
let io = socketIO(functions.https);


// server.listen(() => {
//     console.log(`up server in port ${port}`);
// })



io.on('connection', client => {
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('usuario se desconecto');
    });

    client.on('EnviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('EnviarMensaje', data);
    });

    functions.on('EnviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('EnviarMensaje', data);
    });

    client.emit('EnviarMensaje', {
        user: 'Admin',
        message: 'bienvenido a la app'
    });
});

console.log(io);

exports.getSocket = functions.https.onRequest((req, res) => {
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: 'original' }).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //return res.redirect(303, snapshot.ref.toString());

        // let msg = `Metodo: ${req.method}, valor: ${req.query.text}, this: ${this.addMessage}`
        let respp = socketIO
        console.log('repp', respp)
        return res.status(200).send(respp);
    });
});