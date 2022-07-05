const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPos = require('../controladores/controladorPos');
const rutas = Router();
<<<<<<< HEAD
rutas.post('/agregar',
body('nombr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),
=======
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162

rutas.get('/', controladorPos.Inicio);

rutas.get('/listar', controladorPos.listarpos);

module.exports = rutas;