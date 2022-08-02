const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const rutas = Router();

rutas.get('/', controladorAutenticacion.Inicio);
//rutas.get('/listar', controladorCargos.Listar);

rutas.post('/iniciosesion', 
body('usuario')
.notEmpty().withMessage('Debe escribir el usuario'),
body('contrasena')
.notEmpty().withMessage('Debe escribir la contraseña'),
controladorAutenticacion.InicioSesion);

rutas.get('/error', controladorAutenticacion.Error);


module.exports = rutas;