const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');
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
        const { usua, des} = req.body;
      
        try {
              await ModeloVentasAnuladas.create(
                {
                   usuario: usua,
                   descripcion: des
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};