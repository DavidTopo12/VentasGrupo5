const{validationResult} = require('express-validator'); 
const ModeloVentasSag = require('../modelos/modeloVentasSag');
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
        const { numfac, numsag} = req.body;
      
        try {
              await ModeloVentasSag.create(
                {
                   numero_factura: numfac,
                   numero_sag: numsag
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};