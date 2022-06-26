const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorestacion = require('../controladores/controladorestacion');
const rutas = Router();
rutas.post('/agregar',
body('nom').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),




controladorestacion.Agregar);

module.exports = rutas;