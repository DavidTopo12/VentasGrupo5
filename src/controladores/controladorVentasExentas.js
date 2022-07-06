//Santos Israel Romero 
const { validationResult } = require('express-validator');
//instanciar el modelo ventasexentas
const ModeloVentasExentas = require('../modelos/modeloVentaExentas');
const ModeloVentas = require('../modelos/modeloVentas');
const MSJ = require('../componentes/mensaje');
//MODELO/ CONTROLADOR VENTA- ESTRUCTURA PRINCIPAL,
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
//Inicio
exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "VentasExentas",
            rutas: [
                {
                    ruta: "/api/exentas/",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de ventas exentas"
                },
                {
                    ruta: "/api/exentas/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los ventas exentas"
                },
                {
                    ruta: "/api/exentas/agregar",
                    metodo: "post",
                    parametros: {
                        numfactura: "Numero de Factura. Obligatorio",
                        numorden: "Numero de Orden. Obligatorio",

                    },
                    descripcion: "Guarda los datos de las ventas exentas"
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
};
//crear la funcion de lista de todos los registros de la tabla 
exports.listarventasexentas = async (req, res) => {
    try {
        const listarventasexentas = await ModeloVentasExentas.findAll();
        if (listarventasexentas.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventasexentas);
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
        const { numfactura, numorden } = req.body;
        try {
            var buscarfactura = await ModeloVentas.findOne({
                where: {
                    NumeroFactura: numfactura
                }
            });
            if (!buscarfactura) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El numero de factura no existe o no esta vinculado a ninguna venta',
                    parametro: 'numerofactura'
                };
                MSJ(res, 200, msj);
            }
            else {
                try {
                    await ModeloVentasExentas.create(
                        {
                            numero_factura: numfactura,
                            numero_orden: numorden
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