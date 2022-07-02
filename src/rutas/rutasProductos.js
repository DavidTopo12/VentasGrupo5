const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProducto = require('../controladores/controladorProducto');
const rutas = Router();

rutas.get('/listar', controladorProducto.listarProductos)

module.exports = rutas;