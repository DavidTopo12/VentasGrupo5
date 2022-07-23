const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas = require('./modeloVentas')
const Ventas_Exentas = bd.define(
    'ventas_exentas',
    {
        numerofactura:{
            type: DataTypes.INTEGER,
            primaryKey: true,
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
Ventas.hasMany(Ventas_Exentas,{
    foreignKey: 'numerofactura',
    otherKey: 'idregistro'
}); 
Ventas_Exentas.belongsTo(Ventas,{
    foreignKey: 'numerofactura',
    otherKey: 'idregistro'
});

module.exports = Ventas_Exentas;