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
            defaultValue: null 
        }
        

},        
{
    tableName: 'ventas_anuladas',
    timestamps: false,
}
);


module.exports = Ventas_Anuladas;