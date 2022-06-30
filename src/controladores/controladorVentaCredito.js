const{validationResult} = require('express-validator'); 
const ModeloVentaCredito = require('../modelos/modeloVentaCredito');
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
        const { idv} = req.body;
      
        try {
              await ModeloVentaCredito.create(
                {
                   IdVenta: idv
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};