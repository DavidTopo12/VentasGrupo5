const { validationResult } = require('express-validator');
const Modelocai = require('../modelos/modelocai');
exports.Agregar = async (req, res) => {
   
    const validaciones =  validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if(validaciones.errors.length>0){
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
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};
