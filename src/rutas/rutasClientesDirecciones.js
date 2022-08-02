const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteDireccion = require('../controladores/controladorClientesDirecciones');
const rutas = Router();
const passport= require('../configuraciones/passport');

rutas.get('/', controladorClienteDireccion.Inicio);

rutas.get('/listar', passport.ValidarAutendicado, controladorClienteDireccion.listarclientedireccion);

rutas.post('/agregar',
body('cliente')
.notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Ingresar valores enteros'),
body('direc').
notEmpty().withMessage('No se aceptan campos vacios')
.isLength({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
controladorClienteDireccion.Agregar);


rutas.put('/editar',
query('idClienteDireccion')
.notEmpty().withMessage('No se aceptan valores vacios')
.isInt().withMessage('El id del cai debe ser un entero'),
body('cliente')
.notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Ingresar valores enteros'),
body('direc').
notEmpty().withMessage('No se aceptan campos vacios')
.isLength({min:3}).withMessage('Ingresar un minimo de 3 caracteres'),
controladorClienteDireccion.Editar);


rutas.delete('/eliminar',
query('idClienteDireccion')
.notEmpty().withMessage('No se aceptan valores vacios para el id del usuario')
.isInt().withMessage('El id del cliente debe ser un entero'),
controladorClienteDireccion.Eliminar);

module.exports = rutas;