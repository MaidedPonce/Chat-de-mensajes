const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const authentication = require('./auth')
const router = express.Router() 

router.post('/sign-in', function(req, res) {
  authentication.auth(req.body.apiKeyToken)
  .then(() =>{
    response.succes(req, res, 201)
  })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
  })
})
 router.post('/sign-up', function (req, res) {
   controller.addUser(req.body.name, req.body.email, req.body.password)
   .then(user => {
    response.succes(req, res, user, 201)
   })
   .catch(err => {
     response.err(req, res, 'Internal Error', 500, err)
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
