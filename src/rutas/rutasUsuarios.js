const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuarios = require('../controladores/controladorUsuarios');
const rutas = Router();
const passport= require('../configuraciones/passport');


rutas.get('/', controladorUsuarios.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorUsuarios.Listar);

module.exports = rutas;