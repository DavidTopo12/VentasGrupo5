const{validationResult} = require('express-validator'); 
const ModeloEmpleados = require('../modelos/modeloEmpleados');

exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"Empleados",
           rutas: [
            {
                ruta: "/api/empleados",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de empleados"
            },
            {
                ruta: "/api/empleados/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los empleados"
            } 
           ]
        }
    ];
}


exports.listarempleados = async (req, res) => {

    try {
        const listarempleados = await ModeloEmpleados.findAll();

        if (listarempleados.length == 0) {
            res.send("No hay empleados Registrados");
        }
        else {
            res.json(listarempleados);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};





/*exports.Agregar = async (req, res) => {
   
    const validaciones =  validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if(validaciones.errors.length>0){
        validaciones.errors.forEach(element => {
            msj.mensaje+=element.msg;
        });

    }
    else{
        const { numid, nomemp, ApeEmp, cargEmp, fecha_ingreso} = req.body;
      
        try {
              await ModeloEmpleados.create(
                {
                   NumeroIdentidad: numid,
                   NombreEmpleado: nomemp,
                   ApellidoEmpleado: ApeEmp,
                   CargoEmpleado: cargEmp,
                   FechaIngreso: fecha_ingreso
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};*/