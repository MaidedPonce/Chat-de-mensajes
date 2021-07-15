const passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs')
const boom = require('@hapi/boom')
const User = require('../../utils/services/users')

passport.use(new BasicStrategy(async function (email, password, cb) {
  const userService = new User();
  try {
    const user = await userService.getUsers({ email })
    
    if (!user) {
      return cb(boom.unauthorized(), false)
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return cb(boom.unauthorized(), false)
    }
    
    delete user.password
    // console.log(user)
    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
})
)

