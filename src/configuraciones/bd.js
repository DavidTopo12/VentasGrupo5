const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',
    'les',
    'les-1234',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;