const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorDetallePedido = require('../controladores/controladorDetallePedido');
const rutas = Router();

rutas.get('/', ControladorDetallePedido.Inicio);

rutas.get('/listar', ControladorDetallePedido.listardetallepedidos);

module.exports = rutas;