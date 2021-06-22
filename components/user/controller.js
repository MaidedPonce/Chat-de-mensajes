const bcrypt = require('bcryptjs')
const store = require('./store')

async function addUser (name, email, password) {
  /** if (!name) {
    return Promise.reject('Invalid name')
  }**/
  const hashed = await bcrypt.hash(password, 10)

  const user = {
    name: name,
    email: email,
    password: hashed
  }
  if (!user) {
    return ('No hay usuario, ksjsj')
  }
  console.log(user)
  return store.add(user)
}

function listAllUsers () {
  return store.list()
}

module.exports = {
  addUser,
  listAllUsers
}
