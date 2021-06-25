// DEBUG=app:* node scripts/seedUsers.js
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const debug = require('debug')('app:scripts:users')
const MongoLib = require('../lib/mongo/mongo')
const { config } = require('../config')

const users = [
  {
    name: 'Jose Maria',
    email: 'jose@undefined.sh',
    password: 'config.defaultUserPassword'
  },
  {
    name: 'Maria Jose',
    email: 'maria@undefined.sh',
    password: 'config.defaultUserPassword'
  }
]
async function createUser (mongoDB, user) {
  const { name, email, password } = user
  const hashedPassword = await bcrypt.hash(password, 10)
  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword
  })
  return userId
}

async function seedUsers () {
  try {
    const mongoDB = new MongoLib()

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user)
      debug(chalk.green('User created with id:', userId))
    })

    await Promise.all(promises)
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}

seedUsers()
