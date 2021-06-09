const express=require('express');
const router= express.Router();

//Importar express validator
const { body } = require('express-validator/check');

//importar controllers
const proyectosControllers= require('../controllers/proyectosControllers');
const tareasController= require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports=function(){
//ruta para el home
router.get('/', 
authController.usuarioAutenticado,
proyectosControllers.proyectosHome
);

router.get('/nuevo-proyecto', 
authController.usuarioAutenticado,
proyectosControllers.formularioProyecto
);

router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.nuevoProyecto
);

router.get('/nosotros',(req,res)=>{
    res.render('nosotros');
})
//Listar proyectos
router.get('/proyectos/:url', 
        authController.usuarioAutenticado,        
        proyectosControllers.proyectoPorUrl
);

//Actualizar el proyecto
router.get('/proyecto/editar/:id', 
        authController.usuarioAutenticado,
        proyectosControllers.formularioEditar
);

router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.actualizarProyecto
);

//Eliminar proyecto
router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosControllers.eliminarProyecto
);   
 
// Tareas
router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea
);   
 
 // Actualizar Tarea
 router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
);

// Eliminar Tarea
router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
);

// Crear nueva cuenta
router.get('/crear-cuenta', usuariosController.formCrearCuenta);
router.post('/crear-cuenta', usuariosController.crearCuenta);
router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

// iniciar sesión
router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
router.post('/iniciar-sesion', authController.autenticarUsuario);

// cerrar sesion
router.get('/cerrar-sesion', authController.cerrarSesion);

// reestablecer contraseña
router.get('/reestablecer', usuariosController.formRestablecerPassword);
router.post('/reestablecer', authController.enviarToken);
router.get('/reestablecer/:token', authController.validarToken);
router.post('/reestablecer/:token', authController.actualizarPassword);


return router;
}
