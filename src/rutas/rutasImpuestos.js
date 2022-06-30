const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorImpuestos = require('../controladores/controladorImpuesto');
const rutas = Router();
rutas.post('/agregar',
body('nomb').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),

body('val').
notEmpty().withMessage('No aceptan campos vacios')
.isDecimal(10,4).withMessage('Solo aceptan numero Entero'),




controladorImpuestos.Agregar);

module.exports = rutas;