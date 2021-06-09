const express = require('express');
const routes=require('./routes');
const path=require('path');
const bodyParse=require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

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

//Habilitar bodyParse para leer datos del formulario
app.use(bodyParse.urlencoded({extended:true}));

// Agregamos express validator a toda la aplicación
app.use(expressValidator());

//agregar la carpeta de vistas views
app.set('views',path.join(__dirname,'./views'));

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({ 
    secret: "keyboard cat", 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

// agregar flash messages
app.use(flash());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});


app.use('/',routes());

//puerto en que corre
app.listen(3000);