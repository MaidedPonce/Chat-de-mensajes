const express = require('express')
const app = express()
const server = new (require('http').Server)(app)
const passport = require('passport');
const cors = require('cors')
const socket = require('./socket')
const { config } = require('./config')
const users = require('./components/user/network')
const chats = require('./components/chat/netwok')
socket.connect(server)

app.use('/app', express.static('public'))
app.use(express.json())
app.use(cors())
app.use(passport.initialize());
// app.use(passport.authenticate());
// app.use(passport.session());
users(app)
chats(app)
// app.use('/app', express.static('public'))

// http://localhost:3000/message?error=ok
/* app.get('/message', function (req, res) {
  if (req.query.error == 'ok') {
    response.error(req, res, 'Error inesperado', 500)
  } else {
    response.succes(req, res, 'Creado correctamente', 201)
  }
}) */

server.listen(config.port, function () {
  console.log('La app está escuchando en' + config.host + ':' + config.port)
})
