/**Para mejorar nuestras respuestas 
 * Como no tenemos algo por si algo no funciona
 * tenemos que crear un status
 * Objeto con todos los codigos de estado
 * y que tenga una respuesta para ellos (los mensajes)
*/
const statusMessage = {
   '200': 'Done',
   '201': 'Created',
   '400': 'Invalid format',
   '500': 'Internal error'
}

exports.succes = function(req, res, message, status){
    let statusCode = status
    let statusMessages = message
    if (!status){
        status = 200
    }
    if (!message){
        statusMessages = statusMessages[status]
    }
    res.status(statusCode).send({
        error: '',
        body: message
    })
}

exports.error = function(req, res, message, status, details){
    console.error('[response error] ' + details) 
    res.status(status || 500).send({
        error: message,
        body: '',
    })
}