const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorclientes');
const rutas = Router();
rutas.post('/agregar',
body('rtn').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),

body('nombre').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),




controladorCliente.Agregar);

module.exports = rutas;