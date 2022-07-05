const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuarioCliente = require('../controladores/controladorUsuarioClientes');
const rutas = Router();
rutas.post('/agregar',
body('corr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),

body('face').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),

body('contra').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),


controladorUsuarioCliente.Agregar);

module.exports = rutas;