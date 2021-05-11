/**Nos vamos a traer las peticiones de GET y POST
 * 
 */
const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const multer = require('multer')
const config = require('../../config')
const upload = multer({
    /**Aquí también podemos usar el config */
    dest: 'public/' + config.fileRoute + '/',
})
/**Nos traemos el controlador */

const controller = require('./controller')



  /**  console.log(req.body);
    console.log(req.query) /**Estas son respuestas planas 
    //res.send('Mensaje añadido correctamente')
    res.send('Mensaje ' + req.body.text + ' añadido correctamente')
})*/


/**router.get('/', function (req, res){
    console.log(req.headers)
    res.header({
        "custom-header" : "Nuestro valor personalizado"
    })
    res.send('Lista de mensajes')
Luego vamos al controlador/getmessages
})*/

router.get('/', upload.single('file'), function (req, res){
    const filterMessages = req.query.user || null
    controller.getMessages(filterMessages)
    .then((messageList) =>{
        response.succes(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e)//e = log interno que va a decirnos nuestro error
    })
})
/**Cómo le hacemos para mostrar los mensajes de una
 * persona?
 * Le decimos que filtre los mensajes y en caso de que no venga, sera nulo
 * y en getMessages le vamos a poner el filterMessages
 */

router.post('/', function (req, res){
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file) /**el req.file se lo tenemos que mandar al controlador para que haga algo con él */
    .then((fullMessage) => {
        response.succes(req, res, fullMessage, 201)
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 400, 'Error en el controlador')
    })
/**Tendrá dos propiedas, el mensaje y el usuario
 * Estas son dos propiedades candidatas a que vengan 
 * en el body de la petición, porque es 
 * información propia que vamos a querer tener
 * aquí, entonces decimos:
 * controller.addMessage(body.user, body.Message)
 * 
 * Vamos al controlador y las logeamos
 * 
 * if (req.query.error == "ok"){
    response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación')
} else {
    response.succes(req, res, 'Creado correctamente', 201)
}
 */

})
router.patch('/:id', function(req, res){
    /**Primero vamos a consultar este ID que vamos a tener */
   // console.log(req.params.id)

    /**Vamos a llamar una funcion del controlador
     * el id lo vamos a sacar de req.params y el text
     * del body*/
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.succes(req, res, data, 200)
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e)
    })
    //res.send('Ok')
})
/**Ya tenemos la parte de red, ahora vamos con el controldor */


/**Patch para hacer modificaciones parciales
 * Aqui vamos a utilizar parametros de la ruta
 * Para utilizar parametros de la ruta
 * lo que yo voy a decir es:
 * :id, con esto voy a generar una variable y vamos a a
 * poder darle el id de lo que quiero modificar
 * dentro de la url
 */

 /**Pos para borrar verdad, jshjs */
router.delete('/:id', function(req, res){
     controller.deleteMessage(req.params.id)
     .then(()=>{
         response.succes(req, res, `Usuario ${req.params.id} eliminado`, 200)
     })
     .catch(e => {
         response.error(req, res, 'Error interno', 500, e)
     })
})

module.exports = router