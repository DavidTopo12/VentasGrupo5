const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasConstancia = require('../controladores/controladorVentasConstancia');
const rutas = Router();

rutas.get('/Listar', controladorVentasConstancia.Listar);

rutas.post('/agregar',
body('numfactura').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numcons').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:20}).withMessage('Solo aceptan numero Entero'),



controladorVentasConstancia.Agregar);

module.exports = rutas;