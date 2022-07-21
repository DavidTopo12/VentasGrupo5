const { validationResult } = require('express-validator');
const Usuario = require('../modelos/modeloUsuarios');
const MSJ = require('../componentes/mensaje');
const { Op } = require('sequelize');
const express = require('express');
const passport = require('../configuraciones/passport');


function validacion (req){
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
    
    if(validaciones.errors.length > 0)
    {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
        //msj.mensaje='Debe escribir todos los campos';
    }
    return msj;
};

exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "Autenticación", 
            rutas: [
                {
                    ruta: "/api/autenticacion",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de autenticación"
                },
                { 
                    ruta: "/api/autenticacion/pin",
                    metodo: "post",
                    parametros:{
                        correo: "Correo electronico del usuario, al que se le enviara un correo con el pin. Obligatorio."
                    },
                    descripcion: "Envio de pin de recuperación de contraseña al correo electrónico."
                },
                {   
                    ruta: "/api/autenticacion/recuperarcontrasena",
                    metodo: "put",
                    parametros: {
                        usuario: "login o correo del usuario. Obligatorio.",
                        pin: "Pin enviado al correo del usuario. Obligatorio.",
                        contrasena: "Nueva contrasena de usuario. Obligatorio.",
                    },
                    descripcion: "Actualiza la contraseña del usuario"
                },
                {   
                    ruta: "/api/autenticacion/iniciosesion",
                    metodo: "post",
                    parametros:
                        {
                            usuario: "Login o correo de usuario. Obligatorio",
                            contrasena: "Contraseña del usuario. Obligatorio.",
                        },
                    descripcion: "Genera el token para poder acceder a las rutas del usuario"
                },
            ],
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
    MSJ(res, 200, msj);
};

/*
exports.Pin = async (req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        MSJ(res, 200, msj);
    }
    else{
        const { correo } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where:{
                correo: correo
            }
        });
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [
                {
                    mensaje: "El correo no exite o no esta vinculado con ningun usuario",
                    parametro: "correo"
                },
            ];
            MSJ(res, 200, msj);
        }
        else{
            const pin = gpc(4);
            buscarUsuario.pin=pin;
            await buscarUsuario.save();
            const data = {
                correo: correo,
                pin: pin
            };
            EnviarCorreo.RecuperarContrasena(data);
            msj.estado= 'correcto';
            msj.mensaje= 'Peticion ejecutada correctamente';
            MSJ(res, 200, msj);
        }
    }
};
exports.Recuperar = async (req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        MSJ(res, 200, msj);
    }
    else{
        const { usuario } = req.query;
        const { pin, contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where:{
                [Op.or]:{
                    correo: usuario,
                    login: usuario
                },
            }
        });
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [
                {
                    mensaje: "El correo o login no exite",
                    parametro: "usuario"
                },
            ];
            MSJ(res, 200, msj);
        }
        else{
            if(pin==buscarUsuario.pin){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion no se ejecuto';
                msj.errores = [
                    {
                        mensaje: "El pin es incorrecto o ha expirado",
                        parametro: "pin"
                    },
                ];
                MSJ(res, 200, msj);
            }
            else{
                buscarUsuario.contrasena=contrasena;
                buscarUsuario.estado='AC';
                buscarUsuario.fallidos=0;
                await buscarUsuario.save()
                .then((data) => {
                    msj.estado= 'correcto';
                msj.mensaje= 'Peticion ejecutada correctamente';
                MSJ(res, 200, msj);
                })
                .catch((error)=>{
                    msj.estado= 'error';
                    msj.mensaje= 'Peticion no ejecutada';
                    msj.errores=error;
                    MSJ(res, 500, msj);
                });
            }
        }
    }
};
*/
exports.Error = async (req, res) =>{
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    msj.estado = 'error';
    msj.mensaje = 'La peticion no se ejecuto';
    msj.errores = [
        {
            mensaje: "Debe enviar las credenciales",
            parametro: "autenticacion"
        },
    ];
    MSJ(res, 200, msj);
};

exports.InicioSesion = async (req, res) =>{
    var msj = validacion(req);
    if(msj.errores.length>0){
        MSJ(res, 200, msj);
    }
    else{
        const { Usuarioo, Contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where:{
                    login: Usuarioo,
                    contrasena: Contrasena
                }
        })
        if(!buscarUsuario){
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = [
                {
                    mensaje: "El usuario o contraseña son incorrectos",
                    parametro: "Usuario"
                },
            ];
            MSJ(res, 500, msj);
        }
        else{
            const token = passport.getToken({id: buscarUsuario.id});
            const data = {
                token: token,
                usuario: {
                    login:buscarUsuario.login,
                    contrasena: buscarUsuario.contrasena
                }
            };
            msj.estado= 'correcto';
            msj.mensaje= 'Peticion ejecutada correctamente';
            msj.datos= data;
            MSJ(res, 200, msj);
            
        }
    }
};