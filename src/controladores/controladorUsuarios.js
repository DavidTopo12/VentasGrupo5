const { validationResult } = require('express-validator');
const ModeloUsuarios = require('../modelos/modeloUsuarios');

//MODULO A CARGO DE: IDALIA ELIZABETH FLORES VASQUEZ
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
           modulo:"Usuarios",
           rutas: [
            {
                ruta: "/api/usuarios/",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de usuarios"
            },
            {
                ruta: "/api/usuarios/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los usuarios"
            }
           ]
        }
    ];
}

exports.Listar = async (req, res) => {

    try {
        const listarusuarios = await ModeloUsuarios.findAll();

        if (listarusuarios.length == 0) {
            res.send("No hay usuarios registrados");
        }
        else {
            res.json(listarusuarios);
        }

    } catch (error) {
        msj.estado = 'precuacion';
        msj.mensaje = 'la peticion no se ejecuto';
        msj.errores = error;
        MSJ(res, 500, msj);

    }
};