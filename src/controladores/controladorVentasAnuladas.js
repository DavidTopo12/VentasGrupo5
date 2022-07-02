const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');
//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA

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
           modulo:"VentasAnuladas",
           rutas: [
            {
                ruta: "/api/anuladas",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de ventas anuladas"
            },
            {
                ruta: "/api/anuladas/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los ventas anuladas"
            },
            {
                ruta: "/api/anuladas/agregar",
                metodo: "post",
                parametros: {
                  usuario: "Numero de Usuario. Obligatorio",
                  descripcion: "Descripcion de la venta . Obligatorio"
                },
                descripcion: "Guarda los datos de las ventas anuladas"
              }    
           ]
        }
    ];
}


exports.Listar = async (req, res) => {
    try {
        const listarVentasAnuladas = await ModeloVentasAnuladas.findAll();

        if (listarVentasAnuladas.length == 0) {
            res.send("No hay ventas anuladas Registradas");
        }
        else {
            res.json(listarVentasAnuladas);
        }

    } catch (error) {
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "la venta anulada no existe o no está vinculado"
        };

        MSJ(res, 500, msj);

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
           

            await ModeloVentasAnuladas.create(
                {
                    usuario: usua,
                    descripcion: des
                }
            );
            msj.mensaje = 'los datos de ventas anuladas se guardaron con éxito';

        } catch (error) {
            msj.estado = 'precaución';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }


    }

    res.json(msj);
};