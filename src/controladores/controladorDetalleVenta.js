const { validationResult } = require('express-validator');
const ModeloDetalleVenta = require('../modelos/modeloDetalleVenta');
const ModeloVentas = require('../modelos/modeloVentas');
const ModeloProducto = require('../modelos/modeloProducto');

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

    try {
        const listardetalle = await ModeloDetalleVenta.findAll();

        if (listardetalle.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listardetalle);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.Agregar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { numfact, codpro, cantidad, prec } = req.body;
        try {
            var buscarnumerofactura = await ModeloVentas.findOne({
                where: {
                    NumeroFactura: numfact
                }
            });

            if (!buscarnumerofactura) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El Numero de Factura no Existe',
                    parametro: 'numfact'
                };

                MSJ(res, 200, msj);
            }

            else {
                var buscarproducto = await ModeloProducto.findOne({
                    where: {
                        Codigo: codpro
                    }
                });

                if (!buscarproducto) {
                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'El Codigo de Producto no Existe',
                        parametro: 'codpro'
                    };

                    MSJ(res, 200, msj);
                }
                else {
                    try {
                        await ModeloDetalleVenta.create(
                            {
                                NumeroFactura: numfact,
                                CodigoPoprducto: codpro,
                                Cantidad: cantidad,
                                Precio: prec
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
            }

        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }
    res.json(msj);
};