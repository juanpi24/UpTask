const express = require('express');
const routes=require('./routes');
const path=require('path');
const bodyParse=require('body-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
//require('./models/Tareas');
//require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al Servidor Ahora'))
    .catch(error => console.log(error));

const { ENGINE_METHOD_ALL } = require('constants');

//crear una app de express
const app= express();
//donde cargar los archivos estaticos
app.use(express.static('public'));
//agregar pug
app.set('view engine','pug');
//agregar la carpeta de vistas views
app.set('views',path.join(__dirname,'./views'));

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//Habilitar bodyParse para leer datos del formulario
app.use(bodyParse.urlencoded({extended:true}));

app.use('/',routes());

//puerto en que corre
app.listen(3000);