const{validationResult} = require('express-validator'); 
const ModeloVentasExentas = require('../modelos/modeloVentaExentas');
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
        const {numfactura, numorden} = req.body;
      
        try {
              await ModeloVentasExentas.create(
                {
                   numero_factura: numfactura,
                   numero_orden: numorden
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};