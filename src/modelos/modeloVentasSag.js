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
module.exports = Ventas_Sag;