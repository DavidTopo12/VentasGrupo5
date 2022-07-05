const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Empleados = bd.define(
    'empleados',
    {
        idregistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NumeroIdentidad:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        NombreEmpleado:{
            type: DataTypes.STRING(50),
            allowNull: false
            
        },
        ApellidoEmpleado: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        CargoEmpleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FechaIngreso: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Salario:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: null
        }

},
{
    tableName: 'empleados',
    timestamps: false,
}
);
module.exports = Empleados;