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
    /**Si no hay estatus, igual a estatus 200,
     * y si no hay estatuscode, si no nos viene un mensaje
     * queremos que estatus messages va a ser igual a nuestros
     * mensajes de estatus, status,
     * estonces en el body quito mensajes y coloco 
     * statusMessage y ya no tengo que poner :
     * o estatus 200 : status || 200
     * sino statuscode
     * y de esta manera configuramos nuestros codigos de status
     * a un defecto y ponemos un mensaje por defecto
     * aunque no nos venga nada
     */
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
/**Si queremos el detalle de un error pero no 
 * violar la seguridad del usuario dando información
 * confidencial de respuesta, entonces podemos usar los logs
 * Por eso estamos usando "details"
 */
    res.status(status || 500).send({
        error: message,
        body: '',
    })
}