const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Clientes = bd.define(
    'clientes',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        RTN:{
            type: DataTypes.STRING(16),
            allowNull: true,
            defaultValue: '00000000000000'
        },
        Nombre:{
            type: DataTypes.STRING(30),
            allowNull: false
            
        },
        Direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: true
        },
        Telefono:{
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: true
        },
        Correo: {
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: true
        },
        Imagen:{
            type: DataTypes.LONGBLOB,
            allowNull: true,
            defaultValue: true
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: true
        }

},
{
    tableName: 'clientes',
    timestamps: false,
}
);
module.exports = Clientes;