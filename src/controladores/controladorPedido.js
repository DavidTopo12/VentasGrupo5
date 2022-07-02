const{validationResult} = require('express-validator'); 
const ModeloPedidos = require('../modelos/modeloPedido');

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
           modulo:"Pedidos",
           rutas: [
            {
                ruta: "/api/pedidos",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de Pedidos"
            },
            {
                ruta: "/api/pedidos/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los pedidos"
            } 
           ]
        }
    ];
};

exports.listarPedidos = async (req, res) => {

    try {
        const listarpedidos = await ModeloPedidos.findAll();

        if (listarpedidos.length == 0) {
            res.send("No hay pedido Registrados");
        }
        else {
            res.json(listarpedidos);
        }

    } catch (error) {
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "el pedido no existe o no está vinculado"
        };

        MSJ(res, 500, msj);

    }
};
