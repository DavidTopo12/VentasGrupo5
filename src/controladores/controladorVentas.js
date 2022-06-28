const{validationResult} = require('express-validator'); 
const ModeloVentas = require('../modelos/modeloVentas');
const Modelocai = require('../modelos/modelocai');
const Modelocliente = require('../modelos/modeloclientes');
const Modeloestacion = require('../modelos/modeloestacion');

exports.listarventas= async (req,res) => {

    try {
    const listarventas= await ModeloVentas.findAll(); 
    
    if(listarventas.length==0) {
        res.send("No hay ventas Registradas");
    }
    else 
    {
        res.json(listarventas);
    }
    
       } catch (error) 
       {
        console.error(error);
        res.json(error);
    
        }
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

        const listarventas = await ModeloVentas.findAll();

        if(!num_fact || !cai || !cliente || !tarjeta || !efectivo || !usu || !estacion || !mesero)
        {
            res.send("Datos Incompletos");
            console.log("Datos incompletos");

        }
        else
        {
            var buscarcai

        }


      
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