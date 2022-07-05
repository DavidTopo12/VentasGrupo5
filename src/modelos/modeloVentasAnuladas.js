const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Usuario = require('./modeloUsuarios');
const Venta = require('./modeloVentas');
const Ventas_Anuladas = bd.define(
    'ventas_anuladas',
    {
        idventa: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idusuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'usuario',
            
        },
        descripcion: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: true 
        }
        

},        
{
    tableName: 'ventas_anuladas',
    timestamps: false,
}
);
Usuario.hasMany(Ventas_Anuladas,{
    foreignKey: 'idusuario',
    otherKey: 'idregistro'
}); 
Ventas_Anuladas.belongsTo(Usuario,{
    foreignKey: 'idusuario',
    otherKey: 'idregistro'
});

Venta.hasMany(Ventas_Anuladas,{
    foreignKey: 'idventa',
    otherKey: 'idregistro'
}); 
Ventas_Anuladas.belongsTo(Venta,{
    foreignKey: 'idventa',
    otherKey: 'idregistro'
});

module.exports = Ventas_Anuladas;