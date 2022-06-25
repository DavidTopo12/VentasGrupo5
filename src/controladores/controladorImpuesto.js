const{validationResult} = require('express-validator'); 
const ModeloImpuesto = require('../modelos/modeloImpuestos');
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
        const { nomb, val} = req.body;
      
        try {
              await ModeloImpuesto.create(
                {
                   nombre: nomb,
                   valor: val
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};