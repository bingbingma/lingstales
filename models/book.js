const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true },
  text: String,
  date: { type: Date, default: Date.now }
});

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  comments: [commentSchema]
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
