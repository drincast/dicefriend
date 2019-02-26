const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, '../../public');

//importamos ruta de login
//app.use( require('./login') );

//app.use(express.static(__dirname + "/public"));
app.use(express.static(publicPath));

module.exports = app;