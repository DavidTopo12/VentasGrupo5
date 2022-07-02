const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorestacion = require('../controladores/controladorestacion');
const rutas = Router();
rutas.post('/agregar',
body('nom').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),




controladorestacion.Agregar);

module.exports = rutas;