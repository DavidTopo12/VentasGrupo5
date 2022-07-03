const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasPos = require('../controladores/controladorVentasPos');
const rutas = Router();

rutas.get('/',controladorVentasPos.Inicio);

rutas.get('/listar', controladorVentasPos.listarventaspos);

rutas.post('/agregar',
body('idv').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('idp').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('ref').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),

body('valo').
notEmpty().withMessage('No aceptan campos vacios')
.isFloat().withMessage('Solo aceptan numero Entero'),



controladorVentasPos.Agregar);

module.exports = rutas;