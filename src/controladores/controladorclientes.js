const{validationResult} = require('express-validator'); 
const Modeloclientes = require('../modelos/modeloclientes');
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
        const { rtn, nombre} = req.body;
      
        try {
              await Modeloclientes.create(
                {
                   RTN: rtn,
                   Nombre: nombre,
                   
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};