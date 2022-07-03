const{validationResult} = require('express-validator'); 
const ModeloProducto = require('../modelos/modeloProducto');
//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA


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
    const datos = {
        api: "API-VENTAS",
        descripcion: "Interfaz de progamación para el sistema de gestion de restaurantes",
        propiedad: "DESOFIW",
        desarrolladores: "",
        colaboradores: "",
        fecha: "5/07/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

function validar(req) {

    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });

        msj.estado = 'precuacion';
        msj.mensaje = 'la peticion no se ejecuto';
        msj.errores = error;
    }
    return msj;
};








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
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "el producto no existe o no está vinculado"
        };

        MSJ(res, 500, msj);

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