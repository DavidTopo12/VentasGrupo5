const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const VentaCredito = bd.define(
    'ventacredito',
    {
        IdCredito: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        IdVenta: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        Activo:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1
            
        }
},
{
    tableName: 'ventacredito',
    timestamps: false,
}
);
module.exports = VentaCredito;