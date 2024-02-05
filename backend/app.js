'use strict'

const express = require('express');
const { readdirSync } = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path').posix;

var app = express();

app.use(cors({origin:true, credentials:true}));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

require('./db')

// var routes = require('./rutas/lista-rutas');

app.use(bodyParser.urlencoded({limit: '50mb', extended:true}))
    //convierte a json todo:
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser. text({type: '/'}));

// Configurar el manejo de archivos estáticos para la carpeta "flora"
app.use('/imagenes/flora', express.static(path.join(__dirname, 'imagenes/flora')));

// Configurar el manejo de archivos estáticos para la carpeta "fauna"
app.use('/imagenes/fauna', express.static(path.join(__dirname, 'imagenes/fauna')));
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); 
});

//rutas
readdirSync('./rutas').map((r) => {
    app.use('/api', require(`./rutas/${r}`));
});

// app.use('/api',routes);
//  app.use(app.router)
//  routes.initialize(app)

module.exports = app;