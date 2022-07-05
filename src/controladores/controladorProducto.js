const { validationResult } = require('express-validator');
const ModeloProducto = require('../modelos/modeloProducto');
const MSJ = require('../componentes/mensaje');
//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA


exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Productos",
            rutas: [
                {
                    ruta: "/api/productos",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de productos"
                },
                {
                    ruta: "/api/productos/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los productos"
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


exports.listarProductos = async (req, res) => {

    try {
        const listarproductos = await ModeloProducto.findAll();

        if (listarproductos.length == 0) {
            res.send("No hay productos Registrados");
        }
        else {
            res.json(listarproductos);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

