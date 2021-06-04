const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    required: true
  }
})

const model = mongoose.model('users', mySchema)
module.exports = model
