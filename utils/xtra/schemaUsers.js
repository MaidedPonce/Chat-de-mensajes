const joi = require('@hapi/joi');
// inciia con cualquier de los numeros alfanumericos del 1 al 9, de la a miniscula a la f minuscula y de la A mayuscula a la F mayuscula y al final tiene un tamaño de 24
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const userSchema = {
    name: joi.string().max(45).min(3).required(),
    email: joi.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
    password: joi.string().required()
}
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
module.exports = { userSchema, userIdSchema};