const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorclientes');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorCliente.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorCliente.Listar);

rutas.post('/agregar',
body('rtn')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
body('nombre').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
controladorCliente.Agregar);


rutas.put('/editar',
query('idcliente')
.notEmpty().withMessage('No se aceptan valores vacios')
.isInt().withMessage('El id del cai debe ser un entero'),
body('rtn')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
body('nombre').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
controladorCliente.Editar);


rutas.delete('/eliminar',
query('idcliente')
.notEmpty().withMessage('No se aceptan valores vacios para el id del usuario')
.isInt().withMessage('El id del cliente debe ser un entero'),
controladorCliente.Eliminar);


module.exports = rutas;