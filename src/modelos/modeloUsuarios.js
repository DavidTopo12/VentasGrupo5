const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');
const Empleado = require('./modeloEmpleados');
const Usuario = db.define(
    'usuario',
    {
        idregistro:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        LoginUsuario:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        empleado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Contrasena:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        AccesoTotal:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
        },
        Habilitado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
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
Empleado.hasMany(Usuario,{
    foreignKey: 'empleado',
    otherKey: 'idregistro'
}); 
Usuario.belongsTo(Empleado,{
    foreignKey: 'empleado',
    otherKey: 'idregistro'
});
module.exports = Usuario;