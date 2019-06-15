const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lingstales");

const pageSeed = [
  {
    pageNumber: 1,
    imageUrl: "localhost:3000/assets/Slide3.JPG",
    comments: []
  },
  {
    pageNumber: 2,
    imageUrl: "localhost:3000/assets/Slide4.JPG",
    comments: [
      {
        author: "Test",
        text: "Great start!",
        date: new Date(Date.now())
      }
    ]
  },
  {
    pageNumber: 3,
    imageUrl: "localhost:3000/assets/Slide5.JPG",
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
