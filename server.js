const express = require('express')
const db = require('./db')
const app = express()
const server = new (require('http').Server)(app)
const { config } = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
// const db = require('./db')
const router = require('./network/routes')
db(config.dbUrl)
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// app.use('/app', express.static('public'))
app.use('/app', express.static('public'))

router(app)
// http://localhost:3000/message?error=ok
/* app.get('/message', function (req, res) {
  if (req.query.error == 'ok') {
    response.error(req, res, 'Error inesperado', 500)
  } else {
    response.succes(req, res, 'Creado correctamente', 201)
  }
}) */

socket.connect(server)

server.listen(config.port, function () {
  console.log('La app está escuchando en' + config.host + ':' + config.port)
})
