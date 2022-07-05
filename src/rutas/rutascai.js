const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorcai = require('../controladores/controladorcai');
const rutas = Router();
<<<<<<< HEAD
=======

rutas.get('/', controladorcai.Inicio);

rutas.get('/listar', controladorcai.Listar);

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
rutas.post('/agregar',


body('cai').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:50}).withMessage('Solo aceptan numero Entero'),

body('fecha_limite').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Solo aceptan numero Entero'),

body('numero_ini').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numero_fin').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),



controladorcai.Agregar);

module.exports = rutas;