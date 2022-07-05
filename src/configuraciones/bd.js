//conexion de la base detaos 
const sequelize = require('sequelize');
const bd = new sequelize(
    'sifcon',//nombre de la base
    'movil21801',//usuario
    'Movil21801@',//contraseña
    {
        host: 'localhost',//alfintrion de la base de datos 
        dialect: 'mysql',//el lenguaje de base de datos que estamos usando 
        port : 4306//puerto de my sql 
    }
);

module.exports = bd;//funcion del archivo para exportas (enviar archivos que otros archivos necesitan)