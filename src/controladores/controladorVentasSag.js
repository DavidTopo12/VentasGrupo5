const { validationResult } = require('express-validator');
const ModeloVentasSag = require('../modelos/modeloVentasSag');
const ModeloVentas = require('../modelos/modeloVentas');
const MSJ = require('../componentes/mensaje');

//MODULO A CARGO DE: Daybelin Vargas

exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Ventas",
            rutas: [
                {
                    ruta: "/api/VentasSag",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de ventasSag"
                },
                {
                    ruta: "/api/VentasSag/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos las ventas Sag"
                },
                {
                    ruta: "/api/VentasSag/guardar",
                    metodo: "post",
                    parametros: {
                        numfac: "Numero de Factura, Campo de Tipo Int. Obligatorio",
                        numsag: "Numero de sag, campo de tipo Int. Obligatorio",
                    },
                    descripcion: "Guardar los datos de las VentasSag"
                }
            ]
        }
    ];
};

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

exports.listarventassag = async (req, res) => {

    try {
        const listarventassag = await ModeloVentasSag.findAll();

        if (listarventassag.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventassag);
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
        const { numfac, numsag } = req.body;
        try {
            var buscarnumerofactura = await ModeloVentas.findOne({
                where: {
                    idregistro: numfac,
                    Anular: 0

                }
            });

            if (!buscarnumerofactura) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El numero factura no existe o no esta vinculado a ninguna venta',
                    parametro: 'numfac'
                };

                MSJ(res, 200, msj);
            }
            else {
                try {
                    await ModeloVentasSag.create(
                        {
                            numFactura: numfac,
                            numero_sag: numsag

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

    //res.json(msj);
};