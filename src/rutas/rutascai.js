const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorcai = require('../controladores/controladorcai');
const rutas = Router();


rutas.get('/', controladorcai.Inicio);

rutas.get('/listar', controladorcai.Listar);

rutas.post('/agregar',
body('cai').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Minimo 3 caracteres'),

body('fecha_limite').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Formato de fecha permitido: dd-mm-yy'),

body('numero_ini').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numero_fin').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),
controladorcai.Agregar);


//modificar
rutas.put('/editar',
query('idCai')
.notEmpty().withMessage('No se aceptan valores vacios')
.isInt().withMessage('El id del cai debe ser un entero'),

body('cai').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Minimo 3 caracteres'),

body('fecha_limite').
notEmpty().withMessage('No se aceptan campos vacios')
.isDate().withMessage('Formato de fecha permitido: dd-mm-yy'),

body('numero_ini').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numero_fin').
notEmpty().withMessage('No se aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),
controladorcai.Editar);
//rutas.get('/otra', controladorInicio.Otra);


//eliminar
rutas.delete('/eliminar',
query('idCai')
.notEmpty().withMessage('No se aceptan valores vacios para el id del usuario')
.isInt().withMessage('El id del usuario debe ser un entero'),
controladorcai.Eliminar);

module.exports = rutas;