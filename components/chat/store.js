const Model = require('./model')

// crear chat y recibir un array de usuarios
function createChat (chat) {
  const newChat = new Model(chat)
  return newChat.save()
}

// listar chats
function chatList (userId) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (userId !== null) {
      filter = { users: userId }
    }
    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          reject(error)
          return false
        }

        resolve(populated)
      })
  })
}

module.exports = {
  create: createChat,
  list: chatList
}
