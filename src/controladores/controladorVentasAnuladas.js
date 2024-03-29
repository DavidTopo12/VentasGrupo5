const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');
const modeloUsuario = require('../modelos/modeloUsuarios');
const modeloVenta = require('../modelos/modeloVentas');
const MSJ = require('../componentes/mensaje');
//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA

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
           modulo:"VentasAnuladas",
           rutas: [
            {
                ruta: "/api/anuladas",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de ventas anuladas"
            },
            {
                ruta: "/api/anuladas/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los ventas anuladas"
            },
            {
                ruta: "/api/anuladas/agregar",
                metodo: "post",
                parametros: {
                  usuario: "Numero de Usuario. Obligatorio",
                  descripcion: "Descripcion de la venta . Obligatorio"
                },
                descripcion: "Guarda los datos de las ventas anuladas"
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
    MSJ(res, 200, msj);
};


exports.Listar = async (req, res) => {
    var msj = validar(req);
    try {
        const listarVentasAnuladas = await ModeloVentasAnuladas.findAll();

        if (listarVentasAnuladas.length == 0) {
            res.send("No hay ventas anuladas Registradas");
        }
        else {
            res.json(listarVentasAnuladas);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
        MSJ(res, 500, msj);

    }
};

exports.AgregarVentaAnulada = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { venta, usua, des } = req.body;

        var buscarusuario = await modeloUsuario.findOne({
            where:{
                idregistro: usua,
                 habilitado: 1   
            }
        });

        if(!buscarusuario){
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El usuario existe o no esta vinculado a ninguna venta anulada',
                parametro: 'usua'
            };

            MSJ(res, 200, msj);
        }
        else{

            var buscarventa = await modeloVenta.findOne({
                where:{
                    idregistro: venta,
                    //Anular: 0   
                }
            });
    
            if(!buscarventa){
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'La venta no existe o no esta vinculado a ninguna venta anulada',
                    parametro: 'venta'
                };
    
                MSJ(res, 200, msj);
            }
            else{
                try {
               
                    await ModeloVentasAnuladas.create(
                        {
                            id_usuario: usua,
                            descripcion: des,
                            idventa: venta
                        }
                    );

                    //buscarventa.Anular = 1
                    //await buscarventa.save();
                    msj.mensaje = 'los datos de ventas anuladas se guardaron con éxito';
        
                } catch (error) {
                    msj.estado = 'precaución';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = error;
                    MSJ(res, 500, msj);
                }
        
            }      






        }  

    }

    //res.json(msj);
};