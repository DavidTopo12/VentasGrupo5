const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasConstancia = require('../controladores/controladorVentasConstancia');
const rutas = Router();

rutas.get('/', controladorVentasConstancia.Inicio);

rutas.get('/listar', controladorVentasConstancia.Listar);

rutas.post('/agregar',
body('numfactura').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numcons').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),

controladorVentasConstancia.Agregar);

module.exports = rutas;