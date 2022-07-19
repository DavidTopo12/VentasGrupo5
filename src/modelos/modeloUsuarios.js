const { DataTypes } = require('sequelize');
const db = require('../configuraciones/bd');
const Empleados = require('./modeloEmpleados');
const Usuario = db.define(
    'usuario',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'idregistro'
        },
        login:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            field: 'LoginUsuario',
        },
        idempleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'empleado',
        },
        contrasena:{
            type: DataTypes.STRING(250),
            allowNull: false,
            field: 'Contrasena',
        },
        accesototal:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true,
            field: 'AccesoTotal',
        },
        habilitado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true,
            field: 'Habilitado',
        },
        pin:{
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: '0000',
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        estado:{
            type: DataTypes.ENUM('BL','AC','IN'),
            allowNull: true,
            defaultValue: 'AC',
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false,
    }
);

Empleados.hasMany(Usuario,{
    foreignKey: 'idempleado',
    otherKey: 'idregistro'
}); 
Usuario.belongsTo(Empleados,{
    foreignKey: 'idempleado',
    otherKey: 'idregistro'
});

module.exports = Usuario;