const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas_Exentas = bd.define(
    'ventas_exentas',
    {
        numero_factura:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_orden:{
            type: DataTypes.STRING(20),
            allowNull: false
        }

},        
{
    tableName: 'ventas_exenta',
    timestamps: false,
}
);
module.exports = Ventas_Exentas;