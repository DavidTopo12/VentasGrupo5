const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const storageEmpleados = multer.diskStorage({

    // definir el lugar donde se almacenará la imagen
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/img/empleados'));
    },

    // creando un nombre dku para el archivo
    filename: function(req, file, cb){

        const nombre = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + nombre + file.mimetype.replace("/", "."));
    }
});

const uploadEmpleados = multer({storage: storageEmpleados});
const controladorArchivos = require('../controladores/controladorArchivo');
const rutas = Router();
rutas.post('/empleados/img', uploadEmpleados.single('img'), controladorArchivos.Recibir);

module.exports = rutas;