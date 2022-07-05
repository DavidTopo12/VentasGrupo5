const{validationResult} = require('express-validator'); 
const ModeloVentasAnuladas = require('../modelos/modeloVentasAnuladas');
<<<<<<< HEAD
exports.Agregar = async (req, res) => {
   
    const validaciones =  validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
=======
const MSJ = require('../componentes/mensaje');
//ENCARGADO - DAVID ALEJANDRO SALGADO ZELAYA

function validar(req) {

    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
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
        msj.estado ='precaucion';
        msj.mensaje = 'la peticion no se ejecutó';
        msj.errores = {
            mensaje: "la venta anulada no existe o no está vinculado"
        };

        MSJ(res, 500, msj);

    }
};

exports.AgregarVentaAnulada = async (req, res) => {

    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    }
    else {
        const { usua, des } = req.body;
>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
        try {
              await ModeloVentasAnuladas.create(
                {
                   usuario: usua,
                   descripcion: des
                   
                  
                }
<<<<<<< HEAD
              )
            msj.mensaje='Registro almacenado';
=======
            );
            msj.mensaje = 'los datos de ventas anuladas se guardaron con éxito';

>>>>>>> 146cddeac3d703a7c97718ddf3885c446b864162
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};