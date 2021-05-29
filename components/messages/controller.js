const config = require('../../config')

const store = require('./store')

const socket = require('../../socket').socket

function addMessage (chat, user, message, file) {
  return new Promise((resolve, reject) => {
    // comprobar si hay usuario
    if (!user || !message) {
      // De donde viene
      console.error('[messageController] No hay usuario o mensaje')
      reject('Los datos son incorrectos')
      return false // esta linea es para que no siga ejecutando
    }
    let fileUrl = ''

    if (file) {
      // fileUrl = 'http://localhost:3000/app/files' + file.filename
      fileUrl = config.host + ':' + config.port + config.publicRoute +
             config.filesRoute + file.filename
    }
    // console.log(user)
    // console.log(message)
    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl
    }
    /* console.log(fullMessage)
        ahora en vez de logearnos esto, vamos
        hacer lo siguiente: */
    store.add(fullMessage)
    socket.io.emit('message', fullMessage)
    resolve(fullMessage)
  })
}

/** vamos a exportar esta funcion
 * y crear um objeto con la funcion
 * addMessage
 * De esta manera vamos a poder exportar
 * todas las funciones que queramos
 * con un único módulo exports
 * que va a exportar el objeto
*/

/** para poder comprobar que todo funciona bien
 * vamos a crear la funcion para agarrar el mensaje
 *
 */
function getMessages (filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser)) 
  }
  )
}

function updateMessages (id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('Invalid date')
      return false
    }
    const result = await store.updateText(id, message)
    resolve(result) 
  })
}

function deleteMessage (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Id invalido')
      return false
    }
    store.remove(id)
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessages,
  deleteMessage
}
