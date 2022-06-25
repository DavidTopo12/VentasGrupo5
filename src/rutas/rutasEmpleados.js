const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const rutas = Router();
rutas.post('/agregar',
body('numid').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:15}).withMessage('Solo aceptan numero Entero'),

body('nomemp').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:50}).withMessage('Solo aceptan numero Entero'),

body('ApeEmp').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt({min:50}).withMessage('Solo aceptan numero Entero'),

body('cargEmp').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('fecha_ingreso').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Solo aceptan numero Entero'),


controladorEmpleados.Agregar);

module.exports = rutas;