const { validationResult } = require('express-validator');
const ModeloVentas = require('../modelos/modeloVentas');
const Modelocai = require('../modelos/modelocai');
const Modelocliente = require('../modelos/modeloclientes');
const Modeloestacion = require('../modelos/modeloestacion');
const MSJ = require('../componentes/mensaje');

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

//MENSAJE DE INICIO
exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Ventas",
            rutas: [
                {
                    ruta: "/api/ventas/",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de ventas"
                },
                {
                    ruta: "/api/ventas/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los ventas"
                },
                {
                    ruta: "/api/ventas/agregar",
                    metodo: "post",
                    parametros: {
                        num_fact: "Numero de Factura. Obligatorio",
                        cai: "ID Cai existente en la tabla de CAI. Obligatorio.",
                        cliente: "ID Cliente existente en la tabla de clientes. Obligatorio.",
                        tarjeta: "Monto de Pago en Tarjeta. Obligatorio.",
                        efectivo: "Monton de pago efectivo.Obligatorio",
                        usu: "Usuario, campo INT.Obligatorio",
                        estacion: "Numero del ID de la estacion existente en la tabla estaciones.Obligatorio",
                        mesero: "Numero del Mesero que le atendió.Obligatorio"
                    },
                    descripcion: "Guarda los datos de las ventas"
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

exports.listarventas = async (req, res) => {
    var msj = validar(req);
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
        MSJ(res, 200, msj);

    }
};

exports.Agregar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { num_fact, cai, cliente, tarjeta, efectivo, usu, estacion, mesero,
        tipopago, tercera, desc, anular, Cierre, FechaHoraIni, FechaHora, Propina,
        total, exento, impuesto15, impuesto18, exonerado } = req.body;
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
                                    idcliente: cliente,
                                    TTarjeta: tarjeta,
                                    TEfectivo: efectivo,
                                    Usu: usu,
                                    estacion: estacion,
                                    Mesero: mesero,
                                    TipoPago: tipopago,
                                    Usu: usu,
                                    TEfectivo: efectivo,
                                    TTarjeta: tarjeta,
                                    estacion: estacion,
                                    Mesero: mesero,
                                    DescuentoTercera: tercera,
                                    Descuento: desc,
                                    Anular: anular,
                                    cierre: Cierre,
                                    propina: Propina,
                                    totalventa: total,
                                    Exento: exento,
                                    Impuesto15: impuesto15,
                                    Impuesto18: impuesto18,
                                    Exonerado: exonerado
                                    
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

   // res.json(msj);
};