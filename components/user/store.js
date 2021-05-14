const Model = require('./model')

function addUser (user) {
  const myUser = new Model(user)
  return myUser.save()
}

function listUsers () {
  return Model.find()
  /** Va a devolver un find de nuestro modelo
     * que el modelo es lo mismo que estabamos
     * utilizando arriba, esto ya
     * devuelve una promesa así que se van quedando hacia
     * atrás
     */
}

module.exports = {
  add: addUser,
  list: listUsers
}
