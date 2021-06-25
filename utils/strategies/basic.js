const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcryptjs')
const boom = require('@hapi/boom')
const controller = require('../../components/user/controller')
passport.use(new BasicStrategy(async function (email, password, cb) {
  try {
    const user = await controller.listAllUsers({ email })
    if (!user) {
      return cb(boom.unauthorized(), false)
    }
    if (!(await bcrypt.compare(password, password.user))) {
      return cb(boom.unauthorized(), false)
    }
    delete user.password
    return cb(null, user)
  } catch (err) {
    return cb(err)
  }
})
)
