const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Numero_Factura = require('./modeloVentas');
const Ventas_Sag = bd.define(
    'ventas_sag',
    {
        
        numFactura:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
            
        },
        numero_sag: {
            type: DataTypes.STRING(20),
            allowNull: false
        }

},        
{
    tableName: 'ventas_sag',
    timestamps: false,
}
);
Numero_Factura.hasMany(Ventas_Sag,{
    foreignKey: 'numFactura',
    otherKey: 'idregistro'
}); 
Ventas_Sag.belongsTo(Numero_Factura,{
    foreignKey: 'numFactura',
    otherKey: 'idregistro'
});
module.exports = Ventas_Sag;