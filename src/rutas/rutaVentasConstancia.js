const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasConstancia = require('../controladores/controladorVentasConstancia');
const rutas = Router();
<<<<<<< HEAD
=======

rutas.get('/', controladorVentasConstancia.Inicio);

rutas.get('/listar', controladorVentasConstancia.Listar);

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
rutas.post('/agregar',
body('numfactura').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numcons').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:20}).withMessage('Solo aceptan numero Entero'),



controladorVentasConstancia.Agregar);

module.exports = rutas;