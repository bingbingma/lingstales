const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true },
  text: String,
  date: { type: Date, default: Date.now }
});

const pageSchema = new Schema({
  pageNumber: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  comments: [commentSchema]
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
