const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');
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
<<<<<<< HEAD
    else{
        const { usua, des} = req.body;
      
=======
    return msj;
};


exports.Inicio = async (req, res) =>{
    var msj = validar(req);
    const listaModulos = [
        {
           modulo:"VentasAnuladas",
           rutas: [
            {
                ruta: "/api/anuladas",
                metodo: "get",
                parametros: "",
                descripcion: "Inicio del módulo de ventas anuladas"
            },
            {
                ruta: "/api/anuladas/listar",
                metodo: "get",
                parametros: "",
                descripcion: "Lista todos los ventas anuladas"
            },
            {
                ruta: "/api/anuladas/agregar",
                metodo: "post",
                parametros: {
                  usuario: "Numero de Usuario. Obligatorio",
                  descripcion: "Descripcion de la venta . Obligatorio"
                },
                descripcion: "Guarda los datos de las ventas anuladas"
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
        const listarVentasAnuladas = await ModeloVentasAnuladas.findAll();

        if (listarVentasAnuladas.length == 0) {
            res.send("No hay ventas anuladas Registradas");
        }
        else {
            res.json(listarVentasAnuladas);
        }

    } catch (error) {
        console.error(error);
        res.json(error);

    }
};

exports.AgregarVentaAnulada = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { usua, des } = req.body;
>>>>>>> 1402a348cd5582bd79691ef0bde61f700f7396ac
        try {
              await ModeloVentasAnuladas.create(
                {
                   usuario: usua,
                   descripcion: des
                   
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
<<<<<<< HEAD
    
    res.json(msj);
=======

    //res.json(msj);
>>>>>>> 1402a348cd5582bd79691ef0bde61f700f7396ac
};