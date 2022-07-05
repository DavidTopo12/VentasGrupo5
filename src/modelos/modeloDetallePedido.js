const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Pedido = require('./modeloPedido');
const Producto = require('./modeloProducto');

const Detalle_Pedido = bd.define(
    'detalle_pedido',
    {
        idregistro:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NumeroPedido:{
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
        Cancelado: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
        },
        Notas: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: true
        },
        Elaborado: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
        },
        Entregado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
        },
        Factura:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: true
        },
        subproducto:{
            type: DataTypes.INTEGER,
            allowNull: true
        }

},
{
    tableName: 'detalle_pedido',
    timestamps: false,
}
);
Pedido.hasMany(Detalle_Pedido,{
    foreignKey: 'NumeroPedido',
    otherKey: 'NumeroPedido'
}); 
Detalle_Pedido.belongsTo(Pedido,{
    foreignKey: 'NumeroPedido',
    otherKey: 'NumeroPedido'
});

Producto.hasMany(Detalle_Pedido,{
    foreignKey: 'CodigoProducto',
    otherKey: 'Codigo'
}); 
Detalle_Pedido.belongsTo(Producto,{
    foreignKey: 'CodigoProducto',
    otherKey: 'Codigo'
});

module.exports = Detalle_Pedido;