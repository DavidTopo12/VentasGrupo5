const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasAnuladas = require('../controladores/controladorVentasAnuladas');
const rutas = Router();

rutas.get('/listar', controladorVentasAnuladas.Listar);


rutas.post('/agregar',
body('usua')
.notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),
body('des')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Minimo 3 caracteres'),
controladorVentasAnuladas.AgregarVentaAnulada);

module.exports = rutas;