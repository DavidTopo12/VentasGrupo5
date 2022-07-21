const { validationResult } = require('express-validator');
const Modelocai = require('../modelos/modelocai');
const MSJ = require('../componentes/mensaje');

// MODULO A CARGO DE - IDALIA ELIZABETH FLORES VASQUEZ

//VALIDAR
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

//MENSAJE DE INICIO
exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Cai",
            rutas: [
                {
                    ruta: "/api/cai/",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del módulo de cai"
                },
                {
                    ruta: "/api/cai/listar",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Lista todos los cai"
                },
                {
                    ruta: "/api/cai/agregar",
                    metodo: "post",
                    parametros: {
                        cai: "CAI. Obligatorio",
                        fecha_limite: "dd-mm-yy.Obligatorio.",
                        numero_ini: "Numero Inicio del Cai. Obligatorio.",
                        numero_fin: "Numero Final de Cai. Obligatorio."
                    },
                    descripcion: "Guarda los datos de Cai"
                },
                {
                    ruta: "/api/cai/editar",
                    metodo: "put",
                    parametros: {
                        idCai: "Id del CAI, en el query.Obligatorio",
                        cai: "CAI. Obligatorio",
                        fecha_limite: "dd-mm-yy.Obligatorio.",
                        numero_ini: "Numero Inicio del Cai. Obligatorio.",
                        numero_fin: "Numero Final de Cai. Obligatorio."
                    },
                    descripcion: "Edita los datos de Cai"
                },
                {
                    ruta: "/api/cai/eliminar",
                    metodo: "put",
                    parametros: {
                        idCai: "Id del CAI, en el query.Obligatorio"
                    },
                    descripcion: "Elimina los datos de Cai"
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

exports.Listar = async (req, res) => {
    var msj = validacion(req);
    try {
        const listarcai = await Modelocai.findAll();

        if (listarcai.length == 0) {
            res.send("No hay cai de ventas registradas");
        }
        else {
            res.json(listarcai);
        }

    } catch (error) {
        msj.estado = 'precuacion';
        msj.mensaje = 'la peticion no se ejecuto';
        msj.errores = error;
        MSJ(res, 500, msj);

    }
};

exports.Agregar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { cai, fecha_limite, numero_ini, numero_fin, activoCai } = req.body;

        try {
            await Modelocai.create(
                {
                    CAI: cai,
                    FechaLimite: fecha_limite,
                    NumeroInicial: numero_ini,
                    NumeroFinal: numero_fin,
                    activo: activoCai,
                }
            )
            msj.estado = 'correcto',
                msj.mensaje = 'Peticion ejecutada correctamente',
                msj.datos = '',
                msj.errores = ''
            MSJ(res, 200, msj);

        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);

        }
    }

   // res.json(msj);
};

exports.Editar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { idCai } = req.query;
        const { cai, fecha_limite, numero_ini, numero_fin, activoCai } = req.body;


        try {
            var buscarCai = await Modelocai.findOne({

                where: {
                    idregistro: idCai
                }
            });
            if (!buscarCai) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                    parametro: 'idCai'
                };

                MSJ(res, 200, msj);
            }
            else {

                try {

                    buscarCai.CAI = cai,
                    buscarCai.FechaLimite = fecha_limite,
                    buscarCai.NumeroInicial = numero_ini,
                    buscarCai.NumeroFinal = numero_fin,
                    buscarCai.activo = activoCai
                    await buscarCai.save();
                    msj.estado = 'correcto',
                        msj.mensaje = 'Peticion ejecutada correctamente, actualizado',
                        msj.datos = '',
                        msj.errores = ''
                    MSJ(res, 200, msj);

                } catch (error) {

                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                        parametro: 'cai'
                    };

                    MSJ(res, 200, msj);

                }
            }
        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);

        }
    }
   // res.json(msj);
};

exports.Eliminar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { idCai } = req.query;

        try {
            var buscarCai = await Modelocai.findOne({

                where: {
                    idregistro: idCai
                }
            });
            if (!buscarCai) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                    parametro: 'idCai'
                };

                MSJ(res, 200, msj);
            }
            else {
                await Modelocai.destroy({
                    where: {
                        idregistro: idCai
                    }
                });
                msj.estado = 'correcto',
                    msj.mensaje = 'Peticion ejecutada correctamente, eliminado',
                    msj.datos = '',
                    msj.errores = ''
                MSJ(res, 200, msj);
            }
        } catch (error) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }
    //res.json(msj);
}; 
