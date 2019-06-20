const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lingstales");

const pageSeed = [
  {
    pageNumber: 1,
    imageUrl: "assets/Slide3.JPG",
    comments: []
  },
  {
    pageNumber: 2,
    imageUrl: "assets/Slide4.JPG",
    comments: [
      {
        id: 1,
        author: "Test",
        text: "Great start!",
        date: new Date(Date.now())
      }
    ]
  },
  {
    pageNumber: 3,
    imageUrl: "assets/Slide5.JPG",
    comments: []
  }
];

db.Page.remove({})
  .then(() => db.Page.collection.insertMany(pageSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
