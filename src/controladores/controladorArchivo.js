const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const Empleado = require('../modelos/modeloEmpleados');
const MSJ = require('../componentes/mensaje');

exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    console.log(id);
    console.log(filename);
    try{
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

        var buscarEmpleado = await Empleado.findOne({
            where:{
                idregistro: id
            }
        });
        if(!buscarEmpleado){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + filename));
                console.log('Imagen eliminada');
            }
            error.mensaje='El id del empleado No existe. Se elimino la imagen enviada';
            error.parametro='id';
            errores.push(error);
            msj.estado= 'precaucion',
            msj.mensaje= 'Peticion ejecutada correctamente',
            msj.errores=errores;
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreimagen));
            if(!buscarImagen){
                console.log('No lo encontro');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreimagen));
                console.log('Imagen eliminada');
            }
            buscarEmpleado.nombreimagen=filename;
            await buscarEmpleado.save()
            .then((data)=>{
                msj.datos = data;
            })
            .catch((error)=>{
                msj.errores=error;
            });
        }
        MSJ(res, 200, msj);
    }catch(error){
        msj.estado='error';
        msj.mensaje='Peticion no procesada';
        msj.errores=error;
        MSJ(res, 500, msj);
    }
};