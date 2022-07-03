const{validationResult} = require('express-validator'); 
const Modeloclientes = require('../modelos/modeloclientes');

//MODULO A CARGO DE - DAVID ALEJANDRO SALGADO ZELAYA

//VALIDAR
function validar(req) {

    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });

        msj.estado = 'precuacion';
        msj.mensaje = 'la peticion no se ejecuto';
        msj.errores = error;
    }
    return msj;
};



exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"Clientes",
           rutas: [
            {
                ruta: "/api/clientes/",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de clientes"
            },
            {
                ruta: "/api/clientes/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los clientes"
            },
            {
                ruta: "/api/clientes/agregar",
                metodo: "post",
                parametros: {
                  rtn: "Rtn del cliente .Obligatorio",
                  nombre: "Nombre del cliente. Obligatorio."
                },
                descripcion: "Guarda los datos de cliente"
              },
              {
                ruta: "/api/clientes/editar",
                metodo: "put",
                parametros: {
                    rtn: "Rtn del cliente .Obligatorio",
                    nombre: "Nombre del cliente. Obligatorio."
                },
                descripcion: "Edita los datos de cliente"
              },
              {
                ruta: "/api/clientes/eliminar",
                metodo: "put",
                parametros: {
                  idcliente:"Id del cliente, en el query.Obligatorio"
                },
                descripcion: "Elimina los datos de cliente"
              }          
           ]
        }
    ];
    const datos = {
        api: "API-VENTAS",
        descripcion: "Interfaz de progamación para el sistema de gestion de restaurantes",
        propiedad: "DESOFIW",
        desarrolladores: "",
        colaboradores: "",
        fecha: "5/07/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};


exports.Listar = async (req, res) => {

    try {
        const listarclientes = await Modeloclientes.findAll();

        if (listarclientes.length == 0) {
            res.send("No hay cliente de ventas registradas");
        }
        else {
            res.json(listarclientes);
        }

    } catch (error) {
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "el cliente no existe o no está vinculado"
        };

        MSJ(res, 500, msj);


    }
};



exports.Agregar = async (req, res) => {
    
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { rtn, nombre } = req.body;
      
        try {
              await Modeloclientes.create(
                {
                   RTN: rtn,
                   Nombre: nombre
                }
              )
              msj.estado = 'correcto',
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
    
    res.json(msj);
};

exports.Editar = async (req, res) => {
   
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { idcliente } = req.query;
        const { rtn, nombre } = req.body;
    
      
        try {
            var buscarCliente = await Modeloclientes.findOne({

                where:{
                    idregistro: idcliente
                }
            });
        if(!buscarCliente){
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El cliente no existe o no esta vinculado a ninguna venta',
                parametro: 'cliente'
            };

            MSJ(res, 200, msj);
    }
        else{

            buscarCliente.RTN=rtn,
            buscarCliente.Nombre=nombre
            await buscarCliente.save();
            msj.estado = 'correcto',
              msj.mensaje = 'Peticion ejecutada correctamente, actualizado',
              msj.datos = '',
              msj.errores = ''
              MSJ(res, 200, msj);
            }   
        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El cliente no existe o no esta vinculado a ninguna venta',
                parametro: 'idcliente'
            };

            MSJ(res, 200, msj);
            
        }
    }
    res.json(msj);
};


exports.Eliminar = async (req, res) => {
   
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { idcliente } = req.query;
      
        try {
            var buscarCliente = await Modeloclientes.findOne({

                where:{
                    idregistro: idcliente
                }
            });
        if(!buscarCliente){
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El cliente no existe o no esta vinculado a ninguna venta',
                parametro: 'idcliente'
            };

            MSJ(res, 200, msj);
        }
        else{
            await Modeloclientes.destroy({
                where:{
                    idregistro: idcliente
                }
            });
            msj.estado = 'correcto',
            msj.mensaje = 'Peticion ejecutada correctamente, eliminado',
            msj.datos = '',
            msj.errores = ''
            MSJ(res, 200, msj);
            }   
        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El cliente no existe o no esta vinculado a ninguna venta',
                parametro: 'idcliente'
            };

            MSJ(res, 200, msj);
            
        }
    }
    res.json(msj);
}; 