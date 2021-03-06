const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.post('/', function (req, res) {
  controller.createChat(req.body.users)
    .then(data => {
      response.succes(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, 'Error en el controlador')
    })
})

router.get('/:userId', function (req, res) {
  controller.chatList(req.params.userId)
    .then(users => {
      response.succes(req, res, users, 200)
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 500, 'Error en el controlador')
    })
})

module.exports = router
