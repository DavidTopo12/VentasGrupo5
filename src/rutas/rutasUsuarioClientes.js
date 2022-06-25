const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuarioCliente = require('../controladores/controladorUsuarioClientes');
const rutas = Router();
rutas.post('/agregar',
body('corr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:250}).withMessage('Solo aceptan numero Entero'),

body('face').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),

body('contra').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:250}).withMessage('Solo aceptan numero Entero'),


controladorUsuarioCliente.Agregar);

module.exports = rutas;