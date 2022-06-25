const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas = require('./modeloVentas');
const Pos = require('./modeloPos');
const Ventas_Pos = bd.define(
    'ventas_pos',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idventa:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idpos:{
            type: DataTypes.INTEGER,
            allowNull: false
            
        },
        referencia: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        numerotarjeta: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: NULL
        },
        valor: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        nombrepropietario: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: NULL
        },
        idmarca:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: NULL
        }

},
{
    tableName: 'ventas_pos',
    timestamps: false,
}
);
Ventas.hasMany(Ventas_Pos,{
    foreignKey: 'idventa',
    otherKey: 'idregistro'
}); 
Ventas_Pos.belongsTo(Ventas,{
    foreignKey: 'idventa',
    otherKey: 'idregistro'
});
Pos.hasMany(Ventas_Pos,{
    foreignKey: 'idpos',
    otherKey: 'idregistro'
}); 
Ventas_Pos.belongsTo(Pos,{
    foreignKey: 'idpos',
    otherKey: 'idregistro'
});

module.exports = Ventas_Pos;