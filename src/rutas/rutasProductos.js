const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProducto = require('../controladores/controladorProducto');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorProducto.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorProducto.listarProductos)

module.exports = rutas;