const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const empleados = require('../modelos/modeloEmpleados');
const clientes = require('../modelos/modeloclientes');
const MSJ = require('../componentes/mensaje');



exports.Recibir = async (req, res) => {
    console.log(req);
    const { filename } = req.file;
    const { id } = req.body;
   
    try{
    
        var buscarEmpleado = await empleados.findOne({
            where:{
                idregistro: id
            }
        });
        if(!buscarEmpleado){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
            
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + filename));
                console.log('Imagen eliminada');
            }
            res.send('el id del empleado no existe')
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreImagen));
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreImagen));
                console.log('Imagen eliminada');
            }
            
            buscarEmpleado.nombreImagen=filename;
            await buscarEmpleado.save()
            .then((data)=>{
                res.json(data);
            })
            .catch((error)=>{
                res.json(error);
            });
        }
        ;
    }catch(error){
        res.json(error);
    }
};


exports.RecibirCliente = async (req, res) => {
    console.log(req);
    const { filename } = req.file;
    const { id } = req.body;
   
    try{
    
        var buscarCliente = await clientes.findOne({
            where:{
                idregistro: id
            }
        });
        if(!buscarCliente){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/clientes/' + filename));
            
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/clientes/' + filename));
                console.log('Imagen eliminada');
            }
            res.send('el id del cliente no existe')
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/clientes/' + buscarCliente.nombreImagen));
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/clientes/' + buscarCliente.nombreImagen));
                console.log('Imagen eliminada');
            }
            
            buscarCliente.nombreImagen=filename;
            await buscarCliente.save()
            .then((data)=>{
                res.json(data);
            })
            .catch((error)=>{
                res.json(error);
            });
        }
        ;
    }catch(error){
        res.json(error);
    }
};





