const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasSag = require('../controladores/controladorVentasSag');
const rutas = Router();

rutas.get('/', controladorVentasSag.Inicio);

rutas.post('/agregar',
body('nomfact').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numsag').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:20}).withMessage('Solo aceptan numero Entero'),





controladorVentasSag.Agregar);

module.exports = rutas;