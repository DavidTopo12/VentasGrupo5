const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const rutas = Router();
<<<<<<< HEAD
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
=======

rutas.get('/', controladorEmpleados.Inicio);

rutas.get('/listar' , controladorEmpleados.listarempleados);

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162

module.exports = rutas;