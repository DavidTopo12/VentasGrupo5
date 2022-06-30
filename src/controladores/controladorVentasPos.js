const{validationResult} = require('express-validator'); 
const ModeloVentasPos = require('../modelos/modeloVentasPos');
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
        const { idv, idp, ref, valo} = req.body;
      
        try {
              await ModeloVentasPos.create(
                {
                   idventa: idv,
                   idpos: idp,
                   referencia: ref, 
                   valor: valo
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};