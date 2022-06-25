const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Impuestos = bd.define(
    'impuestos',
    {
        idimpuesto: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        valor:{
            type: DataTypes.DECIMAL(10,4),
            allowNull: false
            
        }
},
{
    tableName: 'impuestos',
    timestamps: false,
}
);
module.exports = Impuestos;