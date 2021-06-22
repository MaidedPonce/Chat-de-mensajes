const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/', function (req, res) {
  controller.addUser(req.body.name, req.body.email, req.body.password)
    /** En caso de que todo vaya bien vamos a ver qué data nos vendrá */
    .then(data => {
      response.succes(req, res, data, 201)
    })
    .catch(err => {
      response.error(req, res, 'Internal error', 500, err)
    })
})

router.get('/', function (req, res) {
  controller.listAllUsers()
    .then((users) => {
      response.succes(req, res, users, 200)
    })
    .catch(err => {
      response.error(req, res, 'Internal error', 500, err)
    })
})

module.exports = router
