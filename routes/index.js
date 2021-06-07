const express=require('express');
const router= express.Router();

//Importar express validator
const { body } = require('express-validator/check');

//importar controllers
const proyectosControllers= require('../controllers/proyectosControllers');

module.exports=function(){
//ruta para el home
router.get('/', proyectosControllers.proyectosHome);

router.get('/nuevo-proyecto', proyectosControllers.formularioProyecto);

router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.nuevoProyecto);

router.get('/nosotros',(req,res)=>{
    res.render('nosotros');
})
//Listar proyectos
router.get('/proyectos/:url', proyectosControllers.proyectoPorUrl);

//Actualizar el proyecto
router.get('/proyecto/editar/:id', proyectosControllers.formularioEditar);
return router;
}
