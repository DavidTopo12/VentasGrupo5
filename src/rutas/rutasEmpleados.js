const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const rutas = Router();

rutas.get('/listar' , controladorEmpleados.listarempleados);


module.exports = rutas;