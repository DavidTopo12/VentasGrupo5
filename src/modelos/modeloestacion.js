const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Estacion = bd.define(
    'estacion',
    {
        NumeroEstacion: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false
            
        },
        activo: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 1
        },
        vistaprevia:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        },
        tecladovirtual:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        },
        tecladovirtual:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        },
        nombretipo:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1
        },
        nombreproducto:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1
        },
        administracion:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 0
        }

},        
{
    tableName: 'estaciones',
    timestamps: false,
}
);
module.exports = Estacion;