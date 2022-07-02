const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPos = require('../controladores/controladorPos');
const rutas = Router();

rutas.get('/listar', controladorPos.listarpos);

rutas.post('/agregar',
body('nombr').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:45}).withMessage('Solo aceptan numero Entero'),


controladorPos.Agregar);

module.exports = rutas;