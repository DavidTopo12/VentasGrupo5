const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPos = require('../controladores/controladorPos');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorPos.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorPos.listarpos);

module.exports = rutas;