const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',
    'ventas',
    'Ventas1@',
    {
        host: 'desofiw.xyz',
        dialect: 'mysql',
        port : 4306
    }
);

module.exports = bd;