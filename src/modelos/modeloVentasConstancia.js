const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Factura = require('./modeloVentas');
const Ventas_Constancia = bd.define(
    'VentasConstancia',
    {
        
        numero_factura:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
            
        },
        numero_constancia: {
            type: DataTypes.STRING(20),
            allowNull: false
        }

},        
{
    tableName: 'ventas_constancia',
    timestamps: false,
}
);
Factura.hasMany(Ventas_Constancia,{
    foreignKey: 'numero_factura',
    otherKey: 'idregistro'
}); 
Ventas_Constancia.belongsTo(Factura,{
    foreignKey: 'numero_factura',
    otherKey: 'idregistro'
});
module.exports = Ventas_Constancia;