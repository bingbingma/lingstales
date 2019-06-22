const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lingstales");

const bookSeed = [
  {
    bookName: "The Emperor's Seed",
    comments: []
  },
  {
    bookName: "Weighing the Elephant",
    comments: []
  }
];

db.Book.remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
