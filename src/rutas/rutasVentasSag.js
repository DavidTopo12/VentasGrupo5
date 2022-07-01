const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasSag = require('../controladores/controladorVentasSag');
const rutas = Router();
rutas.get('/listar', controladorVentasSag.listarventassag);
rutas.post('/agregar',
body('numfac').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numsag').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar minimo tres caracteres'),





controladorVentasSag.Agregar);

module.exports = rutas;