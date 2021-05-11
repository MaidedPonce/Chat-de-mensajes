//se va a encargar de inicializar nuestro servidor de socket io, de generar una instancia y de poderla compartir
//nos traemos socket io (acuerdate de instalarlo)
const socketIO = require('socket.io')

/**Cómo le hacemos para poner en el socket io
 * en un sitio y en otro todo lo demás
 * socket io esta exportando una funcion,
 * pues la vamos a dejar aqui y vamos a crear nuestra propia funcion de conexion
 */

 /**Lo vamos a guardar en un objeto porque así se 
  * guarda como referencia que es equivalente a los
  * punteros de #C
  * Cada vez que cualquier cosa entre al objeto
  * cambie, nuestra variable socket allá donde 
  * la mandemos, va a estar actualizada
  * entonces socket.io =
  */
const socket = {}
 function connect(server){
     socket.io = socketIO(server) /**nos va a traer un server pero lo debemos tener
     en un sitio. Entonces lo vamos a guardar en un objeto
      */

 }

 module.exports = {
     connect,
     socket
 }