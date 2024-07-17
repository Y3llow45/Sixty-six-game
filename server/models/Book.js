const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  author: String,
  preface: String,
  availability: Number,
  year: Date,
  price: Number,
  signed: Boolean,
  likes: { type: Number, default: 0 },
  pages: Number,
  rating: { type: Number, default: 0 },
})

module.exports = mongoose.model("Book", bookSchema)