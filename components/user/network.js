const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const ApiKey = require('../../utils/services/apiKey')
const { config } = require('../../config')
const passport = require('passport')
const router = express.Router()
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const getApiKeys = new ApiKey()

router.post('/sign-in', function (req, res, next) {
  const { apitoken } = req.body
  if (!getApiKeys) {
    return boom.unauthorized('api Key is required')
  }
  passport.authenticate('basic', function (error, user) {
    try {
      if (error || !user) {
        next(boom.unauthorized())
      }
      req.login(user, { session: false }, async function (error) {
        if (error) {
          next(error)
        }
        const apyKey = await getApiKeys.getApyKey({ token: apitoken })

        if (!apyKey) {
          next(boom.unauthorized())
        }
        const { _id, id, name, email } = user

        const payload = {
          sub: id,
          name,
          email,
          scope: apyKey.scopes
        }
        const tokenJ = jwt.sign(payload, config.auth_jwt_secret, {
          expiresIn: '15m'
        })
        return res.status(200).json({ tokenJ, user: { id, name, email } })
      })
    } catch (err) {
      next(err)
    }
  })
})
 router.post('/sign-up', function (req, res) {
   controller.addUser(req.body.name, req.body.email, req.body.password)
   .then(data => {
    response.succes(req, res, data, 201)
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
