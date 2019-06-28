const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
var cors = require('cors')

app.use(cors())
app.options('*', cors());

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lingstales");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/ping", function (req, res) {
  res.send("pong");
});

app.use(routes);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
