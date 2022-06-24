const sequelize = require('sequelize');
const db = new sequelize(
    'examenip',
    'movil21801',
    'Movil21801@',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 4306
    }
);

module.exports = db;