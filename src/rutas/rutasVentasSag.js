const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentasSag = require('../controladores/controladorVentasSag');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorVentasSag.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorVentasSag.listarventassag);

rutas.post('/agregar',
body('nomfact').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numsag').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),


controladorVentasSag.Agregar);

module.exports = rutas;