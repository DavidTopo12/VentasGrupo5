const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasPos = require('../controladores/controladorVentasPos');
const rutas = Router();

rutas.get('/',controladorVentasPos.Inicio);

rutas.get('/listar', controladorVentasPos.listarventaspos);

rutas.post('/agregar',
body('idventa').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('id_pos').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('id_marca').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('Valor').
notEmpty().withMessage('No aceptan campos vacios')
.isFloat().withMessage('Solo aceptan numero Entero'),

controladorVentasPos.Agregar);

module.exports = rutas;