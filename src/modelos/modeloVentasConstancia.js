const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas_Constancia = bd.define(
    'ventas_constancia',
    {
        
        numero_factura:{
            type: DataTypes.INTEGER,
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
module.exports = Ventas_Constancia;