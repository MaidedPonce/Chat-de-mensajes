/** Para mejorar nuestras respuestas
 * Como no tenemos algo por si algo no funciona
 * tenemos que crear un status
 * Objeto con todos los codigos de estado
 * y que tenga una respuesta para ellos (los mensajes)
*/
let statusMessages = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format',
  500: 'Internal error'
}

exports.succes = function (req, res, message, status) {
  res.status(status || 201).send({
    error: '',
    body: message
  })
}

exports.error = function (req, res, message, status, details) {
  console.error('[response error] ' + details)
  res.status(status || 500).send({
    error: message,
    body: ''
  })
}
