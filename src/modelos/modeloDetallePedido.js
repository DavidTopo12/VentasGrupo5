const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Pedido = require('./modeloPedido');
const Producto = require('./modeloProducto');
const Detalle_Pedido = bd.define(
    'detallePedido',
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
            
        },
        Notas: {
            type: DataTypes.TEXT,
            allowNull: true,
            
        },
        Elaborado: {
            type: DataTypes.TINYINT,
            allowNull: true,
            
        },
        Entregado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            
        },
        Facturado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            
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
    otherKey: 'idregistro'
}); 
Detalle_Pedido.belongsTo(Pedido,{
    foreignKey: 'NumeroPedido',
    otherKey: 'idregistro'
});

Producto.hasMany(Detalle_Pedido,{
    foreignKey: 'CodigoProducto',
    otherKey: 'idregistro'
}); 
Detalle_Pedido.belongsTo(Producto,{
    foreignKey: 'CodigoProducto',
    otherKey: 'idregistro'
});

module.exports = Detalle_Pedido;