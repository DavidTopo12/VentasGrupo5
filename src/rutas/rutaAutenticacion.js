const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const rutas = Router();

rutas.get('/', controladorAutenticacion.Inicio);
//rutas.get('/listar', controladorCargos.Listar);

rutas.post('/iniciosesion', 
body('Usuarioo')
.notEmpty().withMessage('Debe escribir el usuario'),
body('Contrasena')
.notEmpty().withMessage('Debe escribir la contraseña'),
controladorAutenticacion.InicioSesion);



module.exports = rutas;