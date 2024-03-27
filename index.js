// Loading environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

// Setting the view engine to ejs
app.set("view engine", "ejs");

// Serving static files from the public directory
app.use(express.static("public"));

// Parsing URL-envoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Middleware for method overriding
app.use(methodOverride("_method"));

// Home page route
app.get("/", function (req, res) {
  res.render("pages/index");
});

// Movies page route
const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

// Reviews page route
const reviewsRouter = require("./routes/reviews");
app.use("/reviews", reviewsRouter);

// Handling 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server and listen on specified port
app.listen(port, () => {
  // Log a message to console when the server starts
  console.log(`App running on port ${port}`);
});
