//Santos Romero
const{validationResult} = require('express-validator'); 
const Modeloestacion = require('../modelos/modeloestacion');
const MSJ = require('../componentes/mensaje');
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
exports.listarestaciones = async (req, res) => {

    try {
        const listarestaciones = await Modeloestacion.findAll();

        if (listarestaciones.length == 0) {
            res.send("No hay estaciones Registradas");
        }
        else {
            res.json(listarestaciones);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
    }
};
   
    exports.Inicio = async (req, res) =>{
        var msj = validar(req);
        const listaModulos = [
            {
               modulo:"Estacion",
               rutas: [
                {
                    ruta: "/api/estacion/",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de ventas exentas"
                },
                {
                    ruta: "/api/estacion/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todas las estaciones"
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
    };