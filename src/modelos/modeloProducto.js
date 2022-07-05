const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const Productos = bd.define(
    'productos',
    {
        Codigo: {
            type:  DataTypes.STRING(15),
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        Nombre:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        Descripcion:{
            type: DataTypes.TEXT,
            allowNull: false
            
        },
        TipoProducto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Existencia:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Costo:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        CantidadMinima:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        exento:{
            type: DataTypes.TINYINT(1),
            allowNull: true
        },
        Imagen:{
            type: DataTypes.BLOB,
            allowNull: true,
            defaultValue: null
        },
        Habilitado:{
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 1
        },
        Tipo2:{
            type: DataTypes.ENUM('GE','EL', 'PR', 'AL'),
            allowNull: true,
            defaultValue: 'GE'
        },
        orden:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        impuestov:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        impuestoValor:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        ultimo:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true,
            defaultValue: null
        },
        idprincipal:{
            type: DataTypes.STRING(15),
            allowNull: true,
            defaultValue: null
        },
        cantidadprincipal:{
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        idusuario:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        movimiento:{
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: true
        },

},
{
    tableName: 'productos',
    timestamps: false,
}
);
module.exports = Productos;