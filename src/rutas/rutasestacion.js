//Santos Romero
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorestacion = require('../controladores/controladorestacion');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorestacion.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorestacion.listarestaciones);
module.exports = rutas;