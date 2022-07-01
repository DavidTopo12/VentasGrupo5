const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const rutas = Router();
rutas.post('/agregar',
body('numid').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),

body('nomemp').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),

body('ApeEmp').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('cargEmp').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('fecha_ingreso').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Formato de fecha permitido: dd-mm-yy'),


controladorEmpleados.Agregar);

module.exports = rutas;