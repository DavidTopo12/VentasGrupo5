const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',
    'david',
    'topo12',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;

