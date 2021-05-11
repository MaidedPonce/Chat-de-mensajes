const config = require('../../config')
/**Los parametros van a ser:
 * quién la aáde y qué añade
 */

const store = require('./store')
/**De esta forma, cuando cambiemos algo  
 * dentro de nuestra funcion de base de datos, de
 * nuestras funciones store, no vamos a requerir hacer
 * ningun tipo de cambio en nuestros controladores
 * y eso es un beneficio de separar nuestro codigo
*/

const socket = require('../../socket').socket

function addMessage(chat, user, message, file){
    return new Promise((resolve, reject) =>{
        //comprobar si hay ususario
        if(!user || !message){
                            //De donde viene
            console.error('[messageController] No hay usuario o mensaje')
             reject('Los datos son incorrectos')
             return false //esta linea es para que no siga ejecutando
        }
        let fileUrl = ''

        if(file){
            //fileUrl = 'http://localhost:3000/app/files' + file.filename
            //por ejemplo, ya una vez configurado, puedo seguir concatenando
            fileUrl = config.host + ':' + config.port + config.publicRoute 
             + config.filesRoute + file.filename

        }
       // console.log(user)
       // console.log(message)
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }
        /*console.log(fullMessage)
        ahora en vez de logearnos esto, vamos
        hacer lo siguiente:*/
        store.add(fullMessage)
        socket.io.emit('message', fullMessage)
        resolve(fullMessage)
    })
  
}

/**vamos a exportar esta funcion 
 * y crear um objeto con la funcion 
 * addMessage
 * De esta manera vamos a poder exportar
 * todas las funciones que queramos
 * con un único módulo exports
 * que va a exportar el objeto
*/


/**para poder comprobar que todo funciona bien
 * vamos a crear la funcion para agarrar el mensaje
 * 
 */
function getMessages(filterUser){
    /**¿Por qué devolvemos una promesa?
     * Por coherencia, si todas nuestras
     * funciones nos devuelve una promesa
     * es muy sencillo cuando queramos 
     * tocar, añadir o cambiar algo dentro
     * de nuestro codigo sbaer qué es lo que va a
     * pasar, va a devolver una PROMESA
     * Y porque ahora mismo nuestro mock funciona
     * siempre, pero qué va pasar si falla algo
     * en base de datos, cuando trabajemos en una base de datos real
     * Tenemos que poder avisar que algo falló 
     * y la forma más sencilla y clara es devolver una 
     * promesa
     */
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser)) /**Vamos a pasarle esta informacion
        a nuestro list
        Yp quiero filtrar los messages por usuario 
        En el controlador vamos agarrar nuestro filter user 
        como parametro que va a ser el usuario
        que queremos filtrar y vamos a pasarselo directamente
        a nuestro store.list
        y en store.js tambien lo vamos a pasar como parametro en 
        getMessages 
        
        /**ahora nos vamos a
        network y eliminamos esto y añadimos
        codigo real:
         console.log(req.body);
    console.log(req.query) /**Estas son respuestas planas */
    //res.send('Mensaje añadido correctamente')
    //res.send('Mensaje ' + req.body.text + ' añadido correctamente')

      }
  )   
}

 function updateMessages(id, message)
{
    return new Promise(async(resolve, reject)=>{
        if(!id || !message){
            reject('Invalid date')
            return false
        }
      //estamos creando una funcion especifica, es decir, la funcion se llama update
         const result = await store.updateText(id, message) 
         resolve(result) //nos la llevamos a store.js
    })
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if (!id){
            reject('Id invalido')
            return false
        }
        store.remove(id)
        .then(()=>{
            resolve()
        })
        .catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessages,
    deleteMessage
}