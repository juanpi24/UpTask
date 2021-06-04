const express=require('express');
const router= express.Router();

//importar controllers
const proyectosControllers= require('../controllers/proyectosControllers');
module.exports=function(){
//ruta para el home
router.get('/', proyectosControllers.proyectosHome);

router.get('/nosotros',(req,res)=>{
    res.render('nosotros');
})
return router;
}
