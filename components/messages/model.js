const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  date: Date,
  file: String
  // Con esto, ya estamos diciendo qué tipo de información vamos almacenar
})

const model = mongoose.model('messages', mySchema)
module.exports = model
