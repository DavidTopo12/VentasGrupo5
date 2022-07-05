//Santos Israel Romero
const { DataTypes } = require('sequelize');
const bd = require('../configuraciones/bd');
//instanciar el modelo
const Ventas = require('./modeloVentas')
//
const Ventas_Exentas = bd.define(
    //se ponen los nombres de los campos y el tipo,(la estructura de la tabla)
    'ventas_exentas',
    {
        numero_factura:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_orden:{
            type: DataTypes.STRING(20),
            allowNull: false
        }

},        
{
    tableName: 'ventas_exenta',//nombre de la tabla en la base de datos 
    timestamps: false,
}
);
<<<<<<< HEAD
//declaracion de la llave foranea 
Ventas.hasMany(Ventas_Exentas,{
    foreignKey: 'numero_factura',
    otherKey: 'idregistro'
}); 
Ventas_Exentas.belongsTo(Ventas,{
    foreignKey: 'numero_factura',
    otherKey: 'idregistro'
});
=======
>>>>>>> 1402a348cd5582bd79691ef0bde61f700f7396ac
module.exports = Ventas_Exentas;