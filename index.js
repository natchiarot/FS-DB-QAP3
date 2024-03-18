const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

global.DEBUG = false;

// Setting the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Home page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// Extra page if needed
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// Movies page
const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

// Genres page
const genresRouter = require("./routes/genres");
app.use("/genres", genresRouter);

// Reviews page
const reviewsRouter = require("./routes/reviews");
app.use("/reviews", reviewsRouter);

// All APIs
// const apiRouter = require("./routes/api");
// app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
