const{validationResult} = require('express-validator'); 
const ModeloVentasConstancia = require('../modelos/modeloVentasConstancia');
<<<<<<< HEAD
=======
const ModeloVentas = require('../modelos/modeloVentas');
const MSJ = require('../componentes/mensaje');

//controlador constancia, modelo - Idalia Flores 

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

exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"VentasConstancia",
           rutas: [
            {
                ruta: "/api/constancia/",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de ventas constancia"
            },
            {
                ruta: "/api/constancia/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los constancia"
            },
            {
                ruta: "/api/constancia/agregar",
                metodo: "post",
                parametros: {
                  numfactura: "Numero de Factura. Obligatorio",
                  numcons: "Numero Constancia. Obligatorio.",
                },
                descripcion: "Guarda los datos de las constancia de ventas"
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
};

exports.Listar = async (req, res) => {

    try {
        const listarconstancias = await ModeloVentasConstancia.findAll();

        if (listarconstancias.length == 0) {
            res.send("No hay constancias de ventas registradas");
        }
        else {
            res.json(listarconstancias);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
exports.Agregar = async (req, res) => {
   
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
        const { numfactura, numcons} = req.body;
      
        try {
              await ModeloVentasConstancia.create(
                {
                   numero_factura: numfactura,
                   numero_constancia: numcons
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};