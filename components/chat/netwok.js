const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')


/**Necesitamos dos funciones
 * Una ruta post que reciba un array de usuarios 
 * y cree un nuevo chat
 * y por otro lado una ruta get donde podamos listar todos los chats
 * */
router.post('/', function (req, res){
    controller.createChat(req.body.users)
    .then(data => {
        response.succes(req, res, data, 201)
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 400, 'Error en el controlador')
    })
})

    /**userId es para traerme el Id del usuario para traer solo los chats de un usuario*/
    router.get('/:userId', function (req, res){
        controller.createChat(req.params.userId)
        .then(users => {
            response.succes(req, res, users, 200)
        })
        .catch(e => {
            response.error(req, res, 'Información invalida', 500, 'Error en el controlador')
        })
    })

    module.exports = router