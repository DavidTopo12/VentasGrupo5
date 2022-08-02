const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVenta = require('../controladores/controladorVentas');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorVenta.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorVenta.listarventas);

rutas.post('/agregar',
body('num_fact').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('cai').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('cliente').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('tajeta').
notEmpty().withMessage('No se aceptan campos vacios')
.isFloat().withMessage('Decimal permitido'),

body('efectivo').
notEmpty().withMessage('No se aceptan campos vacios')
.isFloat().withMessage('Decimal permitido'),

body('usu').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('estacion').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('mesero').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

controladorVenta.Agregar);

module.exports = rutas;