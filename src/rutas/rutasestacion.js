//Santos Romero
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorestacion = require('../controladores/controladorestacion');
const rutas = Router();
rutas.get('/listar',
controladorestacion.listarestaciones);
module.exports = rutas;