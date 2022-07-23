const{validationResult} = require('express-validator'); 
const ModeloEmpleados = require('../modelos/modeloEmpleados');
const MSJ = require('../componentes/mensaje');

//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA

exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"Empleados",
           rutas: [
            {
                ruta: "/api/empleados",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de empleados"
            },
            {
                ruta: "/api/empleados/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los empleados"
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
    MSJ(res, 200, msj);
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


exports.listarempleados = async (req, res) => {
    
    try {
        const listarempleados = await ModeloEmpleados.findAll();

        if (listarempleados.length == 0) {
            res.send("No hay empleados Registrados");
        }
        else {
            res.json(listarempleados);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
        MSJ(res, 500, msj);
    }
};
