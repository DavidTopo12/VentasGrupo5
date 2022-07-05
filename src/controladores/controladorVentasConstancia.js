const { validationResult } = require('express-validator');
const ModeloVentasConstancia = require('../modelos/modeloVentasConstancia');
const ModeloVentas = require('../modelos/modeloVentas');
const MSJ = require('../componentes/mensaje');

//controlador constancia, modelo - Idalia Flores 

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
            modulo: "VentasConstancia",
            rutas: [
                {
                    ruta: "/api/constancia/",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de ventas constancia"
                },
                {
                    ruta: "/api/constancia/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los constancia"
                },
                {
                    ruta: "/api/constancia/agregar",
                    metodo: "post",
                    parametros: {
                        numfactura: "Numero de Factura. Obligatorio",
                        numcons: "Numero Constancia. Obligatorio.",
                    },
                    descripcion: "Guarda los datos de las constancia de ventas"
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

    //res.json(msj);
};