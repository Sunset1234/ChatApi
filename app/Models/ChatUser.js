
'use strict'

const mongoose = use('Mongoose')

let userSchema = mongoose.Schema({
  chatUser: String,
  mensaje: [{ mensaje:String,tipo:String,emisor:String}]
}, {
  timestamps: true
})

module.exports = mongoose.model('ChatUser', userSchema)
