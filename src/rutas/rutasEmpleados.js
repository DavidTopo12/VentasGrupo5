const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const passport = require('../configuraciones/passport');
const rutas = Router();

rutas.get('/', controladorEmpleados.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorEmpleados.listarempleados);



module.exports = rutas;