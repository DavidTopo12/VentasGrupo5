const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Pedido = bd.define(
    'pedido',
    {
        NumeroPedido:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idmesero:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: true
            
        },
        Estacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: true
        },
        modalidad: {
            type: DataTypes.ENUM('ME','DO','LL'),
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('AAA', 'NNN', 'SNN', 'SSN', 'NNS', 'SNS', 'SSS', 'NSS', 'NSN'),
            allowNull: true,
            defaultValue: 'NNN'
        }

},
{
    tableName: 'pedidos',
    timestamps: false,
}
);
module.exports = Pedido;