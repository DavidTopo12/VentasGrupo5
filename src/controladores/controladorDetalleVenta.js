const{validationResult} = require('express-validator'); 
const ModeloDetalleVenta = require('../modelos/modeloDetalleVenta');
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
        const { numfact, codpro, cantidad, prec} = req.body;
      
        try {
              await ModeloDetalleVenta.create(
                {
                   NumeroFactura: numfact,
                   CodigoPoprducto: codpro,
                   Cantidad: cantidad,
                   Precio: prec
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};