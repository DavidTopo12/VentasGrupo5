const { validationResult } = require('express-validator');
const ModeloClienteDireccion = require('../modelos/modeloClientesDirecciones');
const Cliente = require('../modelos/modeloclientes');
const MSJ = require('../componentes/mensaje');

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

exports.Inicio = async (req, res) => {
    var msj = validar(req);
    const listaModulos = [
        {
            modulo: "Clientes Direcciones",
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
    msj.datos = datos;
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
        console.error(error);
        res.json(error);
    }
};

// parte hecha por - Idalia Elizabeth Flores Vásquez
exports.Agregar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { cliente, direc } = req.body;

        var buscarcliente = await Cliente.findOne({
            where: {
                idregistro: cliente
            }
        });

        if (!buscarcliente) {
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                parametro: 'cai'
            };

            MSJ(res, 200, msj);
        }
        else {
            try {
                await ModeloClienteDireccion.create(
                    {
                        idcliente: cliente,
                        direccion: direc
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


    }

    //res.json(msj);
};


exports.Editar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { idClienteDireccion } = req.query;
        const { cliente, direc } = req.body;

        try {

            var buscarClienteDireccion = await ModeloClienteDireccion.findOne({
                where: {
                    id: idClienteDireccion
                }
            });

            if (!buscarClienteDireccion) {

                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'La direccion no existe o no esta vinculado a ninguna venta',
                    parametro: 'cai'
                };

                MSJ(res, 200, msj);

            }
            else {

                try {
                    buscarClienteDireccion.idcliente = cliente,
                        buscarClienteDireccion.direccion = direc

                    await buscarClienteDireccion.save();
                    msj.estado = 'correcto',
                        msj.mensaje = 'Peticion ejecutada correctamente, actualizado',
                        msj.datos = '',
                        msj.errores = ''
                    MSJ(res, 200, msj);
                } catch (error) {

                    msj.estado = 'precuacion';
                    msj.mensaje = 'la peticion no se ejecuto';
                    msj.errores = {
                        mensaje: 'La direccion no existe o no esta vinculado a ninguna venta',
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
    //res.json(msj);
};


exports.Eliminar = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { idClienteDireccion } = req.query;

        try {
            var buscarClienteDireccion = await ModeloClienteDireccion.findOne({

                where: {
                    id: idClienteDireccion
                }
            });
            if (!buscarClienteDireccion) {
                msj.estado = 'precuacion';
                msj.mensaje = 'la peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'La direccion del cliente no existe o no esta vinculado a ninguna venta',
                    parametro: 'idClienteDireccion'
                };

                MSJ(res, 200, msj);
            }
            else {
                await ModeloClienteDireccion.destroy({
                    where: {
                        id: idClienteDireccion
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
    // res.json(msj);
};


