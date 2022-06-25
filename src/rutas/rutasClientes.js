const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorclientes');
const rutas = Router();
rutas.post('/agregar',
body('rtn').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:16}).withMessage('Solo aceptan numero Entero'),

body('nombre').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:30}).withMessage('Solo aceptan numero Entero'),




controladorCliente.Agregar);

module.exports = rutas;