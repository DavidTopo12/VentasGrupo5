const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');



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

exports.Listar = async (req, res) => {
    try {
        const listarVentasAnuladas = await modeloVentasAnuladas.findAll();

        if (listarVentasAnuladas.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarVentasAnuladas);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.AgregarVentaAnulada = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { usua, des } = req.body;
        try {
           

            await modeloVentasAnuladas.create(
                {
                    usuario: usua,
                    descripcion: des
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