const sequelize = require('sequelize');
const bd = new sequelize(
<<<<<<< HEAD
    'sifcon',
    'movil21801',
    'Movil21801@',
=======
    'sigresdesarrollo',
    'idaliauser',
    'Sunflower.2',
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
    {
        host: 'localhost',
        dialect: 'mysql',
        port : 3306
    }
);

module.exports = bd;