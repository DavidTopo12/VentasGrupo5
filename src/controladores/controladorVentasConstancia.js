const{validationResult} = require('express-validator'); 
const ModeloVentasConstancia = require('../modelos/modeloVentasConstancia');
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
        const { numfactura, numcons} = req.body;
      
        try {
              await ModeloVentasConstancia.create(
                {
                   numero_factura: numfactura,
                   numero_constancia: numcons
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};