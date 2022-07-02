const{validationResult} = require('express-validator'); 
const ModeloProducto = require('../modelos/modeloProducto');

exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"Productos",
           rutas: [
            {
                ruta: "/api/productos",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de productos"
            },
            {
                ruta: "/api/productos/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los productos"
            } 
           ]
        }
    ];
}








exports.listarProductos = async (req, res) => {

    try {
        const listarproductos = await ModeloProducto.findAll();

        if (listarproductos.length == 0) {
            res.send("No hay empleados Registrados");
        }
        else {
            res.json(listarproductos);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};


/*exports.Agregar = async (req, res) => {
   
    const validaciones =  validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if(validaciones.errors.length>0){
        validaciones.errors.forEach(element => {
            msj.mensaje+=element.msg;
        });

    }
    else{
        const { nombr, desc, tip_product, exis, prec, cantimini} = req.body;
      
        try {
              await ModeloProducto.create(
                {
                   nombre: nombr,
                   Descripcion: desc,
                   TipoProducto: tip_product,
                   Existencia: exis,
                   Precio: prec,
                   CantidadMinima: cantimini
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};*/