const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasAnuladas = require('../controladores/controladorVentasAnuladas');
const rutas = Router();


//Listando
rutas.get('/listar', controladorVentasAnuladas.AgregarImpuesto);

rutas.post('/agregar',
body('usua')
.notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('des')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:250}).withMessage('Solo aceptan numero Entero'),



controladorVentasAnuladas.Agregar);

module.exports = rutas;