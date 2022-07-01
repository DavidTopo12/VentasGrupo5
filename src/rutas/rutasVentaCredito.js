const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVentaCredito = require('../controladores/controladorVentaCredito');
const rutas = Router();
rutas.get('/listar', controladorVentaCredito.listarventascredito);

rutas.post('/agregar',
body('idv').
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),



controladorVentaCredito.Agregar);

module.exports = rutas;