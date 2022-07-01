const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorcai = require('../controladores/controladorcai');
const rutas = Router();

rutas.get('/listar', controladorVentasConstancia.Listar);

rutas.post('/agregar',
body('cai').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Minimo 3 caracteres'),

body('fecha_limite').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Formato de fecha permitido: dd-mm-yy'),

body('numero_ini').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numero_fin').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),



controladorcai.Agregar);

module.exports = rutas;