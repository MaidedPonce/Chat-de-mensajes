const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const multer = require('multer')
const path = require('path')
const config = require('../../config')
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const controller = require('./controller')

/** router.get('/', function (req, res){
    console.log(req.headers)
    res.header({
        "custom-header" : "Nuestro valor personalizado"
    })
    res.send('Lista de mensajes')
Luego vamos al controlador/getmessages
}) */

router.get('/', upload.single('file'), function (req, res) {
  const filterMessages = req.query.user || null
  controller.getMessages(filterMessages)
    .then((messageList) => {
      response.succes(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e)// e = log interno que va a decirnos nuestro error
    })
})

router.post('/', upload.single('file'), function (req, res) {
  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file) /** el req.file se lo tenemos que mandar al controlador para que haga algo con él */
    .then((fullMessage) => {
      response.succes(req, res, fullMessage, 201)
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, 'Error en el controlador')
    })
})
router.patch('/:id', function (req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.succes(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})
router.delete('/:id', function (req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.succes(req, res, `Usuario ${req.params.id} eliminado`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router
