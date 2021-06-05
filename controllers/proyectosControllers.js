exports.proyectosHome= (req,res)=>{
    res.render("index",{
        nombrePagina:'Proyectos'
    });
}


exports.formularioProyecto=(req,res)=>{
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto'
    });
}

exports.nuevoProyecto=(req,res)=>{
    //res.send('Enviaste el Formulario');
    //console.log(req.body);
    const {nombre}=req.body;
    let errores=[];
    if (!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores
    if(errores.length>0) {
        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores
        })
    }
    else{
        //No hay errores
        //Insertar en la BD
    }
}
