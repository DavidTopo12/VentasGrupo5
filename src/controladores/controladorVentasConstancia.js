const { validationResult } = require('express-validator');
const ModeloVentasConstancia = require('../modelos/modeloVentasConstancia');
const ModeloVentas = require('../modelos/modeloVentas');

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

exports.Listar = async (req, res) => {

    try {
        const listarconstancias = await ModeloVentasConstancia.findAll();

        if (listarconstancias.length == 0) {
            res.send("No hay constancias de ventas registradas");
        }
        else {
            res.json(listarconstancias);
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
        const { numfactura, numcons } = req.body;

        var buscarFactura = await ModeloVentas.findOne({
            where: {
                NumeroFactura: numfactura,
                Anular: 0

            }
        });

        if (!buscarFactura) {

            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                parametro: 'cai'
            };

            MSJ(res, 200, msj);

        }
        else {

            try {
                await ModeloVentasConstancia.create(
                    {
                        numero_factura: numfactura,
                        numero_constancia: numcons

                    }
                )
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

    res.json(msj);
};