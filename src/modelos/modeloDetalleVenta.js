const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas = require('./modeloVentas');
const Producto = require('./modeloProducto');

const Detalle_Venta = bd.define(
    'detalle_venta',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NumeroFactura:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CodigoProducto:{
            type: DataTypes.STRING(15),
            allowNull: false
            
        },
        Cantidad: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        preciooriginal: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        impuesto: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        grabadoExento:{
            type: DataTypes.CHAR(1),
            allowNull: true,
        }

},
{
    tableName: 'detalle_venta',
    timestamps: false,
}
);
module.exports = Detalle_Venta;