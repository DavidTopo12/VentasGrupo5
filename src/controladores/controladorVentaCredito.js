const { validationResult } = require('express-validator');
const VentaCredito = require('../modelos/modeloVentaCredito');
const ModeloVenta = require('../modelos/modeloVentas');

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

exports.listarventascredito = async (req, res) => {

    try {
        const listarventascredito = await VentaCredito.findAll();

        if (listarventascredito.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventascredito);
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
        const { idv } = req.body;
        try {
            var buscarventa = await ModeloVenta.findOne({
                where: {
                    idregistro: idv,

                }
            });

            if (!buscarventa) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El identificador de la venta no existe ',
                    parametro: 'idv'
                };

                MSJ(res, 200, msj);
            }


            else {
                try {

                    await VentaCredito.create(
                        {
                            IdVenta: idv


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



        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }


    }

    res.json(msj);
};