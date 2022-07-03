const{validationResult} = require('express-validator'); 
const ModeloPos = require('../modelos/modeloPos');

//MODULO A CARGO DE: JOSUE MEJIA
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

exports.Inicio = async (req, res)=>{
    var msj = validar(req);
    const listaModulos = [
        {
            modulo:"Ventas",
            rutas: [
                {
                    ruta: "/api/pos",
                    metodo: "get",
                    parametros: "",
                    descripcion: "Inicio del modulo pos"
                }, 
                {
                    ruta: "/api/pos/listar",
                    metodo:"get",
                    parametros: "",
                    descripcion: "Lista todas las ventas pos"
                },
                {
                    ruta:"/api/pos/agregar",
                    metodo: "post",
                    parametros: {
                        nombre: "Nombre del dato pos. Obligatorio"
                    },
                    descripcion: "Guarda los datos pos"
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

exports.listarpos = async (req, res) => {

    try {
        const listarpos = await ModeloPos.findAll();

        if (listarpos.length == 0) {
            res.send("No hay pos Registradas");
        }
        else {
            res.json(listarpos);
        }

    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

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
        const { nombr} = req.body;
      
        try {
              await ModeloPos.create(
                {
                   nombre: nombr
                  
                }
              )
            msj.mensaje='Registro almacenado';
        } catch (error) {
            msj.mensaje='Error al agregar los datos'
            
        }
    }
    
    res.json(msj);
};