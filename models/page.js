const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  pageNumber: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  comments: [
    {
      author: { type: String, required: true },
      text: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
