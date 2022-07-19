const { validationResult } = require('express-validator');
const ModeloDetallePedido = require('../modelos/modeloDetallePedido');
const MSJ = require('../componentes/mensaje');

//MODULO A CARGO DE - DAVID ALEJANDRO SALGADO ZELAYA

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
            modulo: "Detalle Pedidos",
            rutas: [
                {
                    ruta: "/api/detallepedidos",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de Detalle Pedidos"
                },
                {
                    ruta: "/api/detallepedidos/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los detalles pedidos"
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

exports.listardetallepedidos = async (req, res) => {
    var msj = validacion(req);

    try {
        const listardetallepedido = await ModeloDetallePedido.findAll();

        if (listardetallepedido.length == 0) {
            res.send("No hay detalle pedidos registrados");
        }
        else {
            res.json(listardetallepedido);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
        MSJ(res, 500, msj);


    }


};
