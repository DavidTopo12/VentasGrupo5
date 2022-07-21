const { validationResult } = require('express-validator');
const ModeloVentasPos = require('../modelos/modeloVentasPos');
const ModeloVentas = require('../modelos/modeloVentas');
const ModeloPos = require('../modelos/modeloPos');
const MSJ = require('../componentes/mensaje');

//MODULO A CARGO DE: JOSUE MEJIA
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

exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Ventas",
            rutas: [
                {
                    ruta: "/api/ventas_pos",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del modulo ventas pos"
                },
                {
                    ruta: "/api/ventas_pos/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todas las ventas pos"
                },
                {
                    ruta: "/api/ventas_pos/guargar",
                    metodo: "post",
                    parametros: {
                        idventa: "Id de las ventas existentes en la tabla ventas. Obligatorio",
                        idpos: "Id de pos existente en la tabla pos. Obligatorio",
                        referencia: "Referencia de venta. Obligatorio",
                        valor: "Valor de la venta. Obligatorio"
                    },
                    descripcion: "Guarda los datos de las ventas pos"
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
    msj.datos = datos;
    MSJ(res, 200, msj);
};


exports.listarventaspos = async (req, res) => {
    var msj = validacion(req);
    try {
        const listarventaspos = await ModeloVentasPos.findAll();

        if (listarventaspos.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventaspos);
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
        const { idventa, id_pos, referencia, Valor,
        tarjeta, proprietario, id_marca } = req.body;
        try {
            var buscarventa = await ModeloVentas.findOne({
                where: {
                    idregistro: idventa
                }
            });

            if (!buscarventa) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'La venta no existe o no esta vinculado a ninguna venta',
                    parametro: 'id_venta'
                };

                MSJ(res, 200, msj);
            }

            else {
                var buscarpos = await ModeloPos.findOne({
                    where: {
                        idregistro: id_pos
                    }
                });

                if (!buscarpos) {
                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'El registro no existe o no esta vinculado a ninguna ventapos',
                        parametro: 'id_pos'
                    };

                    MSJ(res, 200, msj);
                }
                try {
                    await ModeloVentasPos.create(
                        {
                            id_venta: idventa,
                            idpos: id_pos,
                            referencia: referencia,
                            numerotarjeta: tarjeta,
                            valor: Valor,
                            nombrepropietario: proprietario,
                            idmarca: id_marca

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
        catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }

    //res.json(msj);
};