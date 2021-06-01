const express = require('express')
const message = require('..//components/messages/network') 
const user = require('..//components/user/network')
const chat = require('..//components/chat/netwok')

/** vamos a necesitar el servidor de express para añadir todas las rutas
 *
 * Va a hacer que nuestras rutas cada vez que llamen a messages,
 * llamen a nuestro componentente de messages
 */
const routes = function (server) {
  server.use('/messages', message)
  server.use('/user', user)
  server.use('/chat', chat)
}

module.exports = routes
