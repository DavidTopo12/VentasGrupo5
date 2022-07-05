//Santos Romero
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorestacion = require('../controladores/controladorestacion');
const rutas = Router();
<<<<<<< HEAD
rutas.get('/listar',
controladorestacion.listarestaciones);
=======

rutas.get('/', controladorestacion.Inicio);

rutas.get('/listar', controladorestacion.listarestaciones);
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
module.exports = rutas;