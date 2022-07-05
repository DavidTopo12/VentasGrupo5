const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProducto = require('../controladores/controladorProducto');
const rutas = Router();
<<<<<<< HEAD
rutas.post('/agregar',
body('nombr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),

body('desc').
notEmpty().withMessage('No aceptan campos vacios')
.isString().withMessage('Solo aceptan numero Entero'),
=======

rutas.get('/', controladorProducto.Inicio);
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162

rutas.get('/listar', controladorProducto.listarProductos)

module.exports = rutas;