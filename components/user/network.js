const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {config} = require('../../config')
const validate = require('../../utils/xtra/validationHandler');
const schema = require('../../utils/xtra/schemaUsers')
const ApiKeysService = require('../../utils/services/apiKey');

const Users = require('../../utils/services/users')

require('../../utils/strategies/basic')

function usersApi(app) {
  const router = express.Router();
  app.use('/users', router)
  const usersServices = new Users();
  const apiKeysService = new ApiKeysService();
  router.post('/sign-in', async function(req, res, next) {
    const { apiKeyToken } = req.body;
    
    if(!apiKeyToken) {
      next(boom.unauthorized('ApiKeyToken is required'), false);
    }  
    passport.authenticate('basic', function(error, user) {
      // console.log(user)
      try {
        if (error || !user) {
           next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function(error) {
          if (error) {
           next(error);
          }

          const apiKey = await apiKeysService.getApyKey({ token: apiKeyToken });
          console.log(apiKey)
          if (!apiKey) {
            next(boom.unauthorized())
          }

          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.auth_jwt_secret, {
            expiresIn: '15m'
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next)
  })
   router.post('/sign-up', validate(schema), async function (req, res, next) {
     const { body: user } = req;
     try {
      const createUserId = await usersServices.createUser({user})
        res.status(201).json({
       data: createUserId,
       message: 'User Create'
     })
     } catch (err){
        next(err)
     }

   })
}

module.exports = usersApi;
