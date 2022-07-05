const sequelize = require('sequelize');
const bd = new sequelize(
    'sifcon',
    'movil21801',
    'Movil21801@',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;