const { validationResult } = require('express-validator');
const ModeloVentas = require('../modelos/modeloVentas');
const Modelocai = require('../modelos/modelocai');
const Modelocliente = require('../modelos/modeloclientes');
const Modeloestacion = require('../modelos/modeloestacion');

//MODELO/ CONTROLADOR VENTAS - TRABAJO EN EQUIPO, ESTRUCTURA PRINCIPAL, GUIA PARA OTROS MODELOS

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

exports.listarventas = async (req, res) => {

    try {
        const listarventas = await ModeloVentas.findAll();

        if (listarventas.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventas);
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
        const { num_fact, cai, cliente, tarjeta, efectivo, usu, estacion, mesero } = req.body;
        try {
            var buscarcai = await Modelocai.findOne({
                where: {
                    idregistro: cai,
                    activo: 1
                }
            });

            if (!buscarcai) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                    parametro: 'cai'
                };

                MSJ(res, 200, msj);
            }

            else {
                var buscarcliente = await Modelocliente.findOne({
                    where: {
                        idregistro: cliente

                    }
                });

                if (!buscarcliente) {
                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'El cliente no existe o no esta vinculado a ningun venta',
                        parametro: 'cliente'
                    };

                    MSJ(res, 200, msj);
                }
                else {
                    var buscarestacion = await Modeloestacion.findOne({
                        where: {
                            NumeroEstacion: estacion

                        }
                    });

                    if (!buscarestacion) {
                        msj.estado = 'precuacion';
                        msj.mensaje = 'la peticion no se ejecuto';
                        msj.errores = {
                            mensaje: 'El estacion no existe o no esta vinculado a ningun venta',
                            parametro: 'estacion'
                        };

                        MSJ(res, 200, msj);
                    }
                    else {
                        try {
                            await ModeloVentas.create(
                                {
                                    NumeroFactura: num_fact,
                                    idcai: cai,
                                    idCliente: cliente,
                                    TTarjeta: tarjeta,
                                    TEfectivo: efectivo,
                                    Usu: usu,
                                    Estacion: estacion,
                                    Mesero: mesero
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