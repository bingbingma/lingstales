const mongoose = require("mongoose");
const db = require("../models");
const { DB_URI_PROD } = require('../keys');

const DB_URI = process.env.NODE_ENV === "prod" ? DB_URI_PROD : "mongodb://localhost/lingstales";
mongoose.connect(DB_URI);

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

  db.Book.find({})
  .then((books) => console.log(books))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });