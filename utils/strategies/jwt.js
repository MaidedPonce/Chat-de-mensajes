const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { config } = require('../../config')
const Users = require('../services/users')

passport.use( 
    new Strategy({
    secretOrKey: config.auth_jwt_secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async function(tokenPayload, cb) {
    try{
        const usersServices = new Users()

        const user = await usersServices.getUsers({ email: tokenPayload.email })
        if(!user) {
            return cb(boom.unauthorized(), false)
        }
        delete user.password;

        cb(null, {...user, scopes: tokenPayload.scopes })
    } catch (error){
        return cb(error)
        }
    })
)

