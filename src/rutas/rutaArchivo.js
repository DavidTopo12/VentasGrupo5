const {Router} = require('express');
const rutas = Router();
const controladorArchivos = require('../controladores/controladorArchivo');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({

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

const upload = multer({storage: storage});
upload.single('img');

rutas.post('/empleados/img', upload.single('img'), controladorArchivos.Recibir);

module.exports = rutas;