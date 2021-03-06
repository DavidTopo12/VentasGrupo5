const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Pos = bd.define(
    'POS',
    {
        idregistro: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: null
            
        },
        activo:{
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 0
            
        }
},
{
    tableName: 'pos',
    timestamps: false,
}
);
module.exports = Pos;