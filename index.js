var express = require("express");
var app = express();

// Setting the view engine to ejs
app.set("view engine", "ejs");

// Home page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// Movies page
app.get("/movies", function (req, res) {
  res.render("pages/movies");
});

// Genres page
app.get("/genres", function (req, res) {
  res.render("pages/genres");
});

// Reviews page
app.get("/reviews", function (req, res) {
  res.render("pages/reviews");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
