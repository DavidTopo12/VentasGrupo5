const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProducto = require('../controladores/controladorProducto');
const rutas = Router();
rutas.post('/agregar',
body('nombr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),

body('desc').
notEmpty().withMessage('No aceptan campos vacios')
.isString().withMessage('Solo aceptan numero Entero'),
controladorProducto.Inicio);

rutas.get('/listar', controladorProducto.listarProductos)

module.exports = rutas;