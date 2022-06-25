const{validationResult} = require('express-validator'); 
const ModeloEmpleados = require('../modelos/modeloEmpleados');
exports.Agregar = async (req, res) => {
   
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
};