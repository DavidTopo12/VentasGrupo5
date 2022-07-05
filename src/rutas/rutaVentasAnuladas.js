const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasAnuladas = require('../controladores/controladorVentasAnuladas');
const rutas = Router();
<<<<<<< HEAD
rutas.post('/agregar',
body('usua').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('des').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:250}).withMessage('Solo aceptan numero Entero'),



controladorVentasAnuladas.Agregar);
=======

rutas.get('/',controladorVentasAnuladas.Inicio);

//Listando
rutas.get('/listar', controladorVentasAnuladas.Listar);

rutas.post('/agregar',
body('usua')
.notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan se aceptan numeros enteros'),
body('des')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:250}).withMessage('Solo aceptan numero Entero'),
controladorVentasAnuladas.AgregarVentaAnulada);
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162

module.exports = rutas;