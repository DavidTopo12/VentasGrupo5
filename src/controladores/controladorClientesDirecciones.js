const{validationResult} = require('express-validator'); 
const ModeloClienteDireccion = require('../modelos/modeloClientesDirecciones');

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

exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"Clientes Direcciones",
           rutas: [
            {
                ruta: "/api/clientesdir",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de Cliente direcciones"
            },
            {
                ruta: "/api/clientesdir/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todas las direcciones de clientes"
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
    msj.datos=datos;
    msjRes(res, 200, msj);
};

exports.listarclientedireccion = async (req, res) => {

    try {
        const listardireccion = await ModeloClienteDireccion.findAll();

        if (listardireccion.length == 0) {
            res.send("No hay direccion de cliente Registrados");
        }
        else {
            res.json(listardireccion);
        }

    } catch (error) {
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "la direccion de cliente no existe o no está vinculado"
        };

        MSJ(res, 500, msj);

    }
};
