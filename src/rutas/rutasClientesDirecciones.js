const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteDireccion = require('../controladores/controladorClientesDirecciones');
const rutas = Router();

rutas.get('/listar', controladorClienteDireccion.listarclientedireccion);