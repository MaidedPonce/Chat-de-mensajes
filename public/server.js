const express = require('express')
const app = express()
const server = new (require('http').Server)(app)

/** Nos podemos traer config, recuerda que ese sirve
 * para no borrar nada al tener todo en desarrollo y en producción
 */
const config = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')

db()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router(app)
/** Por ejemplo, como se va a llamar
 * la ruta donde tenemos nuestra app,
 * esto normalmente no cambia, pero
 * puede que en algún caso cambie
 *
 */
// app.use('/app', express.static('public'))
app.use(config.publicRoute, express.static('public'))

socket.connect(server)

/** Inicializar express */

// app.listen(3000) lo estamos cambiando por el socket
// como el pto es tipico tenerlo en las variables de entorno,
// entonces se va para allá
server.listen(config.port, function () {
  /** Esta no nos puede causar mucho problema pero si
     * podemos concatenar esto: "http://localhost"
     */
  // console.log('La app está escuchando en http://localhost:300')
  console.log('La app está escuchando en' + config.host + ':' + config.port)
})

// console.log('La app está escuchando en http://localhost:300')
