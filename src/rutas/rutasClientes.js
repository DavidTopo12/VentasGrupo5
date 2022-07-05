const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorclientes');
const rutas = Router();
<<<<<<< HEAD
rutas.post('/agregar',
body('rtn').
notEmpty().withMessage('No aceptan campos vacios')
.isString({min:16}).withMessage('Solo aceptan numero Entero'),
=======
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162

rutas.get('/', controladorCliente.Inicio);

rutas.get('/listar', controladorCliente.Listar);

rutas.post('/agregar',
body('rtn')
.notEmpty().withMessage('No aceptan campos vacios')
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
body('nombre').
notEmpty().withMessage('No se aceptan campos vacios')
<<<<<<< HEAD
.isString({min:30}).withMessage('Solo aceptan numero Entero'),




=======
.isString({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
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