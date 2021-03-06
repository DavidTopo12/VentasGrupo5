const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
const cliente = require('../modelos/modeloclientes');
const ClientesDirecciones = bd.define(
    'clientesDirecciones',
    {
        id:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_cliente:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creada:{
            type: DataTypes. DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
},
{
    tableName: 'clientes_direcciones',
    timestamps: false,
}
);
cliente.hasMany(ClientesDirecciones,{
    foreignKey: 'id_cliente',
    otherKey: 'idregistro'
}); 
ClientesDirecciones.belongsTo(cliente,{
    foreignKey: 'id_cliente',
    otherKey: 'idregistro'
});

module.exports = ClientesDirecciones;