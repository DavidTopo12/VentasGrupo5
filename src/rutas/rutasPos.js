const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPos = require('../controladores/controladorPos');
const rutas = Router();
rutas.post('/agregar',
body('nombr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Escribir un minimo de 3 caracteres'),






controladorPos.Agregar);

module.exports = rutas;