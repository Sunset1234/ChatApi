'use strict'

const mongoose = use('Mongoose')

let userSchema = mongoose.Schema({
  emisor: String,
  remitentes:[{id:String, nickname:String}]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', userSchema)

