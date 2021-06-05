const express = require('express');
const routes=require('./routes');
const path=require('path');
const bodyParse=require('body-parser');
const { ENGINE_METHOD_ALL } = require('constants');

//crear una app de express
const app= express();
//donde cargar los archivos estaticos
app.use(express.static('public'));
//agregar pug
app.set('view engine','pug');
//agregar la carpeta de vistas views
app.set('views',path.join(__dirname,'./views'));

//Habilitar bodyParse para leer datos del formulario
app.use(bodyParse.urlencoded({extended:true}));

app.use('/',routes());

//puerto en que corre
app.listen(3000);