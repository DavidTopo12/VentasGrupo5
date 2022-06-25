const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Cliente = require('./modeloclientes');
const Estacion = require('./modeloestacion');
const Cai = require('./modelocai');
const Ventas = bd.define(
    'ventas',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NumeroFactura:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idcai:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TipoPago:{
            type:  DataTypes.ENUM('CONTADO','CREDITO'),
            allowNull: true,
            defaultValue: 'CONTADO'
        },
        Usu:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TEfectivo: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        TTarjeta:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Mesero:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DescuentoTercera:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Descuento:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Anular:{
            type: DataTypes.TINYINT,
            allowNull: true
        },
        cierre:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Estacion:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fechahoraini:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: true
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: true
        },
        propina:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        totalventa:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Exento:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Impuesto15:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Impuesto18:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        Exonerado:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },

},
{
    tableName: 'ventas',
    timestamps: false,
}
);
Cai.hasMany(Ventas,{
    foreignKey: 'idcai',
    otherKey: 'idregistro'
}); 
Ventas.belongsTo(Cai,{
    foreignKey: 'idcai',
    otherKey: 'idregistro'
});
Cliente.hasMany(Ventas,{
    foreignKey: 'idCliente',
    otherKey: 'idregistro'
}); 
Ventas.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    otherKey: 'idregistro'
});
Estacion.hasMany(Ventas,{
    foreignKey: 'Estacion',
    otherKey: 'idregistro'
}); 
Ventas.belongsTo(Estacion,{
    foreignKey: 'Estacion',
    otherKey: 'idregistro'
});
module.exports = Ventas;