const{validationResult} = require('express-validator'); 
const ModeloVentas = require('../modelos/modeloVentas');
exports.Agregar= async (req,res)=>{
    const validaciones= validationResult(req);
    const {num_fact, cai, cliente, tarjeta, efectivo, usu, estacion, mesero} = req.body;
    var msj= {
        mensaje:''
    }
    if(validaciones.length> 0){
        validaciones.errors.forEach(element=>{
            msj.mensaje+=element.msg + '. ';
        });

    }else{
        try{
            if(!descripcion){
                await ModeloVentas.create({
                    nombre: nombre
                });
            }else{
                await ModeloCargo.create({
                    nombre: nombre,
                    descripcion: descripcion
                })
            }
            msj.mensaje='Registro agregado correctamente';
        } catch(error) {
            console.error(error);
            msj.mensaje='Error al agregado los datos';
        }
    }
        res.json(msj);
};



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
        const {num_fact, cai, cliente, tarjeta, efectivo, usu, estacion, mesero} = req.body;
      
        try {
              await ModeloVentas.create(
                {
                   NumeroFactura: num_fact,
                   idcai: cai,
                   idCliente : cliente,
                   TTarjeta : tarjeta, 
                   TEfectivo : efectivo,
                   Usu : usu,
                   Estacion : estacion, 
                   Mesero : mesero
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al guardar los datos'
            
        }
    }
    
    res.json(msj);
};