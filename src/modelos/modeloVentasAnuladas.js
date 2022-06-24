const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Ventas_Anuladas = bd.define(
    'ventas_anuladas',
    {
        idventa: {
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuario:{
            type: DataTypes.INTEGER,
            allowNull: false
            
        },
        descripcion: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: 0 // CONSULTAR 
        }
        

},        
{
    tableName: 'ventas_anuladas',
    timestamps: false,
}
);
module.exports = Ventas_Anuladas;