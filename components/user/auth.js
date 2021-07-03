const express = require('express')
const app = express()
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const passport = require('passport')
app.use(express.json())

const { config } = require('../../config')
const ApiKey = require('../../utils/services/apiKey')
const getApiKeys = new ApiKey()

async function auth(req, res, apiKeyToken, next) {
    //const { apiKeyToken } = req.body
  if (!apiKeyToken) {
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
        const apyKey = await getApiKeys.getApyKey({ token: apiKeyToken })

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
}

module.exports = {auth};