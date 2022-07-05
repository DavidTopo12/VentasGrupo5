const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuarios = require('../controladores/controladorUsuarios');
const rutas = Router();

rutas.get('/', controladorUsuarios.Inicio);

rutas.get('/listar', controladorUsuarios.Listar);

module.exports = rutas;