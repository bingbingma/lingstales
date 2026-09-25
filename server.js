const express = require("express");
const path = require("path");
const fs = require("fs");
const compression = require("compression");
const seo = require("./seo");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
var cors = require('cors')

const isProduction = process.env.NODE_ENV === "production";
const CANONICAL_HOST = "www.lingstales.com";

// One canonical origin: send http:// and the bare domain to https://www with a
// permanent redirect, so crawlers don't index duplicate copies of each page.
// Heroku terminates TLS, so the original scheme is in X-Forwarded-Proto.
app.use((req, res, next) => {
  if (!isProduction) return next();
  const host = (req.headers.host || "").toLowerCase();
  const isHttps = req.headers["x-forwarded-proto"] === "https";
  const isOurDomain = host === CANONICAL_HOST || host === "lingstales.com";
  if (isOurDomain && (!isHttps || host !== CANONICAL_HOST)) {
    return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
  }
  next();
});

app.use(compression());

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lingstales", { useNewUrlParser: true, useUnifiedTopology: true });
console.log('process.env.NODE_ENV: ----->>>>>>>>', process.env.NODE_ENV)

// Serve up static assets (usually on heroku)
// index: false so "/" falls through to the page handler below, which adds
// the page's meta tags and crawlable content.
// /index.html itself stays reachable (the service worker precaches it as the
// offline shell), so mark it as a non-indexable copy of the home page.
if (isProduction) {
  app.get("/index.html", (req, res, next) => {
    res.set({
      Link: `<${seo.SITE_URL}/>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    });
    next();
  });
  app.use(express.static("client/build", { index: false }));
}

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(seo.robotsTxt());
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml").send(seo.sitemapXml());
});

// Define API routes here
app.get("/ping", function (req, res) {
  res.send("pong");
});

app.use(routes);

// Send every other request to the React app. Known pages get their own meta
// tags and content; anything else is still the app, but answers 404.
const indexPath = path.join(__dirname, "./client/build/index.html");
let indexHtml;
app.get("*", (req, res) => {
  if (!indexHtml || !isProduction) {
    indexHtml = fs.readFileSync(indexPath, "utf8");
  }
  const pagePath = req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path;
  if (!seo.PAGES[pagePath]) res.status(404);
  res.type("html").send(seo.renderPage(indexHtml, pagePath));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
