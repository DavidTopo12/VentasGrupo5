const{validationResult} = require('express-validator'); 
const ModeloUsuarioCliente = require('../modelos/modeloUsuarioClientes');
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
        const { corr, face, contra} = req.body;
      
        try {
              await ModeloUsuarioCliente.create(
                {
                   correo: corr,
                   facebook: face,
                   contrasena: contra
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};