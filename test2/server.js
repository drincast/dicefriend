const express = require('express');

let app = express();

app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.send('Prueba completa !!!');
});

app.get('/', (req, res) => {
    
});

app.listen(3003, '10.0.75.1', () => {
    console.log('server ejecutando en 10.0.75.1:3003');
})