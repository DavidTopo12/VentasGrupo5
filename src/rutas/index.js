const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInicio = require('../controladores/controladorInicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);