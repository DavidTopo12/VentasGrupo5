const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorPedido = require('../controladores/controladorPedido');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', ControladorPedido.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, ControladorPedido.listarPedidos);

module.exports = rutas;