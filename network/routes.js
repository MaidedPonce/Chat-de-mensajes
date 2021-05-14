const express = require('express')
const message = require('..//components/messages/network') // queremos traernos el message
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

/** NETWORK.JS
 * Aquí, puedo quitar " ('/message',...."
 * router.delete('/message', function (req, res){
    console.log(req.body);
    console.log(req.query) /**Estas son respuestas planas */
// res.send('Mensaje añadido correctamente')
// res.send('Mensaje ' + req.body.text + ' añadido correctamente')
// })*/

/** Ya tenemos nuestro archivo de rutas en
 * "routes.js" al cual tenemos una funcion que podamos exportar
 * y en nuestro server.js nos lo estamos trayendo:
 * const router = require('./network/routes')
 */
module.exports = routes
