const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',
    'lesnin',
    'lesnin123',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;

