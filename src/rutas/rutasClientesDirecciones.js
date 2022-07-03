const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteDireccion = require('../controladores/controladorClientesDirecciones');
const rutas = Router();

rutas.get('/', controladorClienteDireccion.Inicio);

rutas.get('/listar', controladorClienteDireccion.listarclientedireccion);

module.exports = rutas;