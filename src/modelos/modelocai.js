const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Cai = bd.define(
    'cai',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CAI:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        FechaLimite:{
            type: DataTypes.DATE,
            allowNull: false
            
        },
        NumeroInicial: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        NumeroFinal:{
            type: DataTypes.INTEGER,
            allowNull: false //no acepta nulos
        },
        creado: {
            type: DataTypes.DATE,
            allowNull: true,//si acepta nulos
            defaultValue: true 
        },
        activo:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 1
        }

},
{
    tableName: 'cai',
    timestamps: false,
}
);
module.exports = Cai;