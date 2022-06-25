const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/db');
const UsuarioClientes = bd.define(
    'usuarioclientes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idcliente:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        gmail: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        facebook:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        logueado:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 0
        },
        activo:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1
        },
        pin:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        expiration:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }

},
{
    tableName: 'usuarioclientes',
    timestamps: false,
}
);
module.exports = UsuarioClientes;