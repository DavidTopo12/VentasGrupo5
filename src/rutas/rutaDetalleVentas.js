//Lesnin Ramírez
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorDetalleVenta = require('../controladores/controladorDetalleVenta');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/listar', passport.ValidarAutendicado, controladorDetalleVenta.listardetalle);

rutas.post('/agregar',
body('numfact').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('codpro').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('cantidad').
notEmpty().withMessage('No se aceptan campos vacios')
.isFloat().withMessage('Solo aceptan numero Entero'),

body('prec').
notEmpty().withMessage('No se aceptan campos vacios')
.isFloat().withMessage('Solo aceptan numero Entero'),


controladorDetalleVenta.Agregar);

module.exports = rutas;