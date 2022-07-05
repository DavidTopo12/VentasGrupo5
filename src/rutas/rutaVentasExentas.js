//Santos Israel Romero
const { Router } = require('express');
const { body, query } = require('express-validator');
//instanciar el controlador ventasexentas
const controladorVentasExentas = require('../controladores/controladorVentasExentas');
const rutas = Router();
<<<<<<< HEAD
=======

rutas.get('/',controladorVentasExentas.Inicio);

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
rutas.get('/listar', controladorVentasExentas.listarventasexentas);
rutas.post('/agregar',//la creacion de la ruta y validacion de datos 
body('numfactura').
//mensaje de retroalimentacion al usuario 
notEmpty().withMessage('No aceptan campos vacios')
.isInt().withMessage('Solo aceptan numero Entero'),

body('numorden').
notEmpty().withMessage('No se aceptan campos vacios')
.isString({min:3}).withMessage('Solo aceptan numero Entero'),


controladorVentasExentas.Agregar);

module.exports = rutas;