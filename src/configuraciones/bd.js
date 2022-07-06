//conexion de la base detaos 
const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',//nombre de la bas
    'sirm97',//usuario
    'Sirm9705',//contraseña
    {
        host: 'localhost',//alfintrion de la base de datos 
        dialect: 'mysql',//el lenguaje de base de datos que estamos usando 
        port : 3306//puerto de my sql 
    }
);

module.exports = bd;//funcion del archivo para exportas (enviar archivos que otros archivos necesitan)