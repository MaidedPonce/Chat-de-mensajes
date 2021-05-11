const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
/**Este va a relacionar a dos usuarios
 * vamos a obtener objetos de tipo
 * esquema objectId
 */
users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
}   
]
})

const model = mongoose.model('Chat', mySchema)
module.exports = model