const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorPedido = require('../controladores/controladorPedido');
const rutas = Router();

rutas.get('/listar', ControladorPedido.listarPedidos);