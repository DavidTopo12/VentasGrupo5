const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasPos = require('../controladores/controladorVentasPos');
const rutas = Router();
rutas.post('/agregar',
body('idv').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('idp').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('ref').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),

body('valo').
notEmpty().withMessage('No aceptan campos vacios')
.isFloat().withMessage('Decimal o entero permitido'),



controladorVentasPos.Agregar);

module.exports = rutas;