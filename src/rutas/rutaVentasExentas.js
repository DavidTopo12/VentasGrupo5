const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasExentas = require('../controladores/controladorVentasExentas');
const rutas = Router();
rutas.post('/agregar',
body('numfactura').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numorden').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),


controladorVentasExentas.Agregar);

module.exports = rutas;