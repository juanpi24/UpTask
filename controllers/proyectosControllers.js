const Proyectos=require('../models/Proyectos');
//const Tareas = require('../models/Tareas');
exports.proyectosHome= async (req,res)=>{
    const proyectos= await Proyectos.findAll();
    res.render("index",{
        nombrePagina:'Proyectos',
        proyectos
    });
}


exports.formularioProyecto=async(req,res)=>{
    const proyectos= await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto= async(req,res)=>{
    //res.send('Enviaste el Formulario');
    //console.log(req.body);
    const proyectos= await Proyectos.findAll();
    const {nombre}=req.body;
    let errores=[];
    if (!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores
    if(errores.length>0) {
        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        })
    }
    else{
        //No hay errores
        //Insertar en la BD
        //const url=slug(nombre).toLowerCase();
        const proyecto= await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectos= await Proyectos.findAll();
    const proyecto =  Proyectos.findOne({
        where: {
            url: req.params.url, 
            }
    });

    if (!proyecto) return next();

    //Render a la vista
    res.render('tareas',{
        nombrePagina:'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectos= await Proyectos.findAll();
 // render a la vista
     res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyectos
    })
}