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
        await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectosPromise=  Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.url, 
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

    if (!proyecto) return next();

    //Render a la vista
    res.render('tareas',{
        nombrePagina:'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise=  Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where: {
            id: req.params.id, 
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

 // render a la vista
     res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyecto,
        proyectos
    })
}

exports.actualizarProyecto= async(req,res)=>{
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
        res.render('actualizarProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        })
    }
    else{
        //No hay errores
        //Insertar en la BD
        //const url=slug(nombre).toLowerCase();
        await Proyectos.update(
            {nombre:nombre},
            {where:{id:req.params.id}}

            );
        res.redirect('/');
    }
}

exports.eliminarProyecto = async(req,res,next) => {

    // req y query o params
    // console.log(req);

     const {urlProyecto} = req.query;
     const resultado = await Proyectos.destroy({where:{urL : urlProyecto}});
     if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
 }