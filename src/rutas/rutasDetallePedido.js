const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorDetallePedido = require('../controladores/controladorDetallePedido');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', ControladorDetallePedido.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, ControladorDetallePedido.listardetallepedidos);

module.exports = rutas;