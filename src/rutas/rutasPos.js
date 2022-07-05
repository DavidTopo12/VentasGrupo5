const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPos = require('../controladores/controladorPos');
const rutas = Router();

rutas.get('/', controladorPos.Inicio);

rutas.get('/listar', controladorPos.listarpos);

module.exports = rutas;