const { validationResult } = require('express-validator');
const ModeloDetalleVenta = require('../modelos/modeloDetalleVenta');
const ModeloVentas = require('../modelos/modeloVentas');
const ModeloProducto = require('../modelos/modeloProducto');
const MSJ = require('../componentes/mensaje');

exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listarModulos = [
        {
            modulo: "Ventas",
            rutas: [
                {
                    ruta: "/api/detalleventas",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del Modulo de Ventas"
                },

                {
                    ruta: "/api/detalleventas/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Listar Detalle Ventas"
                },

                {
                    ruta: "/api/detalleventas/guardar",
                    metodo: "post",
                    parametros: {
                        numfact: "Numero de Factura, Campo de Tipo Int. Obligatorio",
                        codpro: "Codigo de Producto, Campo de Tipo String. Obligatorio",
                        cantidad: "Cantidad, Campo de Tipo Double. Obligatorio",
                        prec: "Precio de la Venta, Campo de Tipo Double. Obligatorio"
                    },
                    descripcion: "Guardar los Datos de Detalle Ventas"
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
        listarModulos
    };
    msj.datos = datos;
    MSJ(res, 200, msj);
};

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

exports.listardetalle = async (req, res) => {
    var msj = validar(req);
    try {
        const listardetalle = await ModeloDetalleVenta.findAll();

        if (listardetalle.length == 0) {
            res.send("No hay detalle de ventas Registradas");
        }
        else {
            res.json(listardetalle);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
        MSJ(res, 500, msj);

    }
};

exports.Agregar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { numfact, codpro, cantidad, prec, original, impu, exento } = req.body;

        try {
            var buscarFactura = await ModeloVentas.findOne({
                where: {
                    NumeroFactura: numfact
                }
            });

            if (!buscarFactura) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El Numero de factura no existe o no esta vinculado a ninguna venta',
                    parametro: 'numfact'
                };

                MSJ(res, 200, msj);
            }
            else {

                var buscarProducto = await ModeloProducto.findOne({
                    where: {
                        Codigo: codpro
                    }
                });

                if (!buscarProducto) {
                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'El Codigo de Producto no existe o no esta vinculado a ninguna venta',
                        parametro: 'codpro'
                    };

                    MSJ(res, 200, msj);
                }
                else {

                    try {
                        await ModeloDetalleVenta.create(
                            {
                                NumeroFactura: numfact,
                                CodigoProducto: codpro,
                                Cantidad: cantidad,
                                Precio: prec,
                                preciooriginal: original,
                                impuesto: impu,
                                grabadoExento: exento
                            }
                        )
                        msj.estado = 'correcto',
                            msj.mensaje = 'Peticion ejecutada correctamente',
                            msj.datos = '',
                            msj.errores = ''
                        MSJ(res, 200, msj);

                    } catch (error) {
                        msj.estado = 'precuacion';
                        msj.mensaje = 'la peticion no se ejecuto, no se guardó';
                        msj.errores = error;
                        MSJ(res, 500, msj);

                    }

                }
            }

        } catch (error) {

            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);

        }



    }



    //res.json(msj);
};