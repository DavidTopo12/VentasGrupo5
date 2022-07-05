//nos permite implementar estrategias de autenticación de 
//una manera rápida y simple. 

//se descargan por la funcion que pueden llegar a ofrecer en nuestra aplicacion 

const passport = require('passport');
const Usuario = require('../modelos/modeloUsuarios');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const expiracion = moment.duration(500, "m").asSeconds();
const claveToken = 'MiClaveSegura';
exports.getToken = (data) =>{
    return JWT.sign(data, claveToken, {expiresIn: expiracion});
};
const opciones = {
    jwtFromRequest: extraerJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: claveToken
};
//busqueda del ususario
passport.use(new estrategiaJWT(opciones, async (payload, done)=> {
    return await Usuario.findOne({
        where:{
            id: payload.id,
            habilitado: true,
            estado: 'AC'
        }
    })
    .then((data)=>{
        return done(null, data.id);
    })
    .catch((error)=>{
        console.log(error);
        return done(null, false);
    });
}));
exports.ValidarAutendicado = 
passport.authenticate('jwt', {
    session: false, failureRedirect: '/api/autenticacion/error'
});