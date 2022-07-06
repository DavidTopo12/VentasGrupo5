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
        else {

            try {
                await ModeloVentasConstancia.create(
                    {
                        numero_factura: numfactura,
                        numero_constancia: numcons

                    }
                )
                msj.mensaje = 'Peticion ejecutada correctamente',
                msj.datos = '',
                msj.errores = ''
                MSJ(res, 200, msj);
            } catch (error) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = error;
                MSJ(res, 500, msj);


            }

        }
    }
    
    res.json(msj);
};