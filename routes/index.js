const express=require('express');
const router= express.Router();

//Importar express validator
const { body } = require('express-validator/check');

//importar controllers
const proyectosControllers= require('../controllers/proyectosControllers');
const tareasController= require('../controllers/tareasController');

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
router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.actualizarProyecto);

//Eliminar proyecto
router.delete('/proyectos/:url', proyectosControllers.eliminarProyecto);   
 
// Tareas
router.post('/proyectos/:url', tareasController.agregarTarea);   
 
 // Actualizar Tarea
 router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

// Eliminar Tarea
router.delete('/tareas/:id', tareasController.eliminarTarea);

return router;
}
