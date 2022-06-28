const { validationResult } = require('express-validator');
const ModeloVentas = require('../modelos/modeloVentas');
const Modelocai = require('../modelos/modelocai');
const Modelocliente = require('../modelos/modeloclientes');
const Modeloestacion = require('../modelos/modeloestacion');

exports.listarventas = async (req, res) => {

    try {
        const listarventas = await ModeloVentas.findAll();

        if (listarventas.length == 0) {
            res.send("No hay ventas Registradas");
        }
        else {
            res.json(listarventas);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.Agregar = async (req, res) => {

    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg;
        });

    }
    else {
        const { num_fact, cai, cliente, tarjeta, efectivo, usu, estacion, mesero } = req.body;
        try {
            const listarventas = await ModeloVentas.findAll();

            if (!num_fact || !cai || !cliente || !tarjeta || !efectivo || !usu || !estacion || !mesero) {
                res.send("Datos Incompletos");
                console.log("Datos incompletos");

            }
            else {
                var buscarcai = await Modelocai.findOne({
                    where: {
                        idregistro: cai,
                        activo: 1
                    }
                });

                if (!buscarcai) {
                    msj.mensaje += 'El id de cai no existe';
                }

                else {
                    var buscarcliente = await Modelocliente.findOne({
                        where: {
                            idregistro: cliente

                        }
                    });

                    if (!buscarcliente) {
                        msj.mensaje += 'El id de cliente no existe';
                    }
                    else {
                        var buscarestacion = await Modeloestacion.findOne({
                            where: {
                                NumeroEstacion: estacion

                            }
                        });

                        if (!buscarestacion) {
                            msj.mensaje += 'El id de estacion no existe';
                        }
                        else {
                            try {
                                await ModeloVentas.create(
                                    {
                                        NumeroFactura: num_fact,
                                        idcai: cai,
                                        idCliente: cliente,
                                        TTarjeta: tarjeta,
                                        TEfectivo: efectivo,
                                        Usu: usu,
                                        Estacion: estacion,
                                        Mesero: mesero
                                    }
                                )
                                msj.mensaje = 'Registro almacenado';
                            } catch (error) {
                                msj.mensaje = 'Error al guardar los datos'

                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            msj.mensaje = 'Error al procesamiento de datos'
            res.json(msj);
        }


    }

    res.json(msj);
};