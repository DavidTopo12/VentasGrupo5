const { validationResult } = require('express-validator');
const Modelocai = require('../modelos/modelocai');
exports.Agregar = async (req, res) => {
   
    const validaciones =  validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if(validaciones.errors.length>0){//si hay cero errore deja pasar si hay un error no deja continuar
        validaciones.errors.forEach(element => {
            msj.mensaje+=element.msg;
        });

    }
    else {
        const { cai, fecha_limite, numero_ini, numero_fin } = req.body;

        try {
            await Modelocai.create(
                {
                    CAI: cai,
                    FechaLimite: fecha_limite,
                    NumeroInicial: numero_ini,
                    NumeroFinal: numero_fin
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
<<<<<<< HEAD
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};
=======
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
        const { cai, fecha_limite, numero_ini, numero_fin } = req.body;


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
                        buscarCai.NumeroFinal = numero_fin
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
>>>>>>> 1402a348cd5582bd79691ef0bde61f700f7396ac
