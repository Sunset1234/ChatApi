
'use strict'

const mongoose = use('Mongoose')

let userSchema = mongoose.Schema({
  usuarios: [{ id: String, }],
  mensaje: [{ mensaje:String,tipo:String}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', userSchema)
