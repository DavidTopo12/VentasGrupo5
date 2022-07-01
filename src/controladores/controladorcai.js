const{validationResult} = require('express-validator'); 
const Modelocai = require('../modelos/modelocai');

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

exports.Listar = async (req, res) => {

    try {
        const listarcai = await Modelocai.findAll();

        if (listarcai.length == 0) {
            res.send("No hay cai de ventas registradas");
        }
        else {
            res.json(listarcai);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.Agregar = async (req, res) => {
   
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { cai, fecha_limite, numero_ini, numero_fin} = req.body;
      
        try {
              await Modelocai.create(
                {
                   CAI: cai,
                   FechaLimite: fecha_limite,
                   NumeroInicial: numero_ini,
                   NumeroFinal: numero_fin
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
    
    res.json(msj);
};

exports.Editar = async (req, res) => {
   
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { idCai } = req.query;
        const { cai, fecha_limite, numero_ini, numero_fin} = req.body;
    
      
        try {
            var buscarCai = await Modelocai.findOne({

                where:{
                    idregistro: idCai
                }
            });
        if(!buscarCai){
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                parametro: 'cai'
            };

            MSJ(res, 200, msj);
    }
        else{

            buscarCai.CAI=cai,
            buscarCai.FechaLimite=fecha_limite,
            buscarCai.NumeroInicial=numero_ini,
            buscarCai.NumeroFinal=numero_fin
            await buscarCai.save();
            msj.estado = 'correcto',
              msj.mensaje = 'Peticion ejecutada correctamente, actualizado',
              msj.datos = '',
              msj.errores = ''
              MSJ(res, 200, msj);
            }   
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
    res.json(msj);
};

exports.Eliminar = async (req, res) => {
   
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else{
        const { idCai } = req.query;
      
        try {
            var buscarCai = await Modelocai.findOne({

                where:{
                    idregistro: idCai
                }
            });
        if(!buscarCai){
            msj.estado = 'precuacion';
            msj.mensaje = 'la peticion no se ejecuto';
            msj.errores = {
                mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                parametro: 'cai'
            };

            MSJ(res, 200, msj);
        }
        else{
            await Modelocai.destroy({
                where:{
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
            msj.errores = {
                mensaje: 'El Cai no existe o no esta vinculado a ninguna venta',
                parametro: 'cai'
            };

            MSJ(res, 200, msj);
            
        }
    }
    res.json(msj);
}; 
