const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  wins: { type: Number, default: 0 },
  loses: { type: Number, default: 0 },
})

module.exports = mongoose.model("User", userSchema, 'books')