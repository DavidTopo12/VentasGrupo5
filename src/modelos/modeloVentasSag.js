const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Numero_Factura = require('./modeloVentas');
const Ventas_Sag = bd.define(
    'ventas_sag',
    {
        
        numero_factura:{
            type: DataTypes.INTEGER,
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
    foreignKey: 'numero_factura'
}); 
Ventas_Sag.belongsTo(Numero_Factura,{
    foreignKey: 'numero_factura'
});
module.exports = Ventas_Sag;