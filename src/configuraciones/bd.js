const sequelize = require('sequelize');
const bd = new sequelize(
    'sigresdesarrollo',
    'idaliauser',
    'Sunflower.2',
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;