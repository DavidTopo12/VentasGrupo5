const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorImpuestos = require('../controladores/controladorImpuesto');
const rutas = Router();

//Listando
rutas.get('/listar', controladorImpuestos.AgregarImpuesto);

//Agregando a la tabla
rutas.post('/agregar',
body('nomb')
.notEmpty().withMessage('No se aceptan campos vacios en el impuesto')
.isString({min:10}).withMessage('Minimo 10 caracteres en este campo'),
body('val')
.notEmpty().withMessage('No se aceptan campos vacios en el valor isv')
.isDecimal(10,4).withMessage('Solo se aceptan números decimales'),
controladorImpuestos.AgregarImpuesto);

module.exports = rutas;