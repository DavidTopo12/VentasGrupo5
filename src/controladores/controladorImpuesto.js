const { validationResult } = require('express-validator');
const ModeloImpuesto = require('../modelos/modeloImpuestos');

//Modelo Controlador de Impuesto - David Alejandro Salgado Zelaya

//Función de validación
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

exports.AgregarImpuesto = async (req, res) => {
    try {
        const listarImpuesto = await ModeloImpuesto.findAll();

        if (listarImpuesto.length == 0) {
            res.send("No hay impuesto registrado");
        }
        else {
            res.json(listarImpuesto);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.AgregarImpuesto = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { nomb, val } = req.body;
        try {
            await ModeloImpuesto.create(
                {
                    nombre: nomb,
                    valor: val
                }
            );
            msj.mensaje = 'los datos de impuesto se guardaron con éxito';

        } catch (error) {
            msj.estado = 'precaución';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }


    }

    res.json(msj);
};