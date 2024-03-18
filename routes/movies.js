const express = require("express");
const router = express.Router();
const moviesDal = require("../services/movies.dal");

router.get("/", async (req, res) => {
  try {
    let theMovies = await moviesDal.getMovies();
    res.render("movies", { theMovies });
  } catch (error) {
    console.log(error);
    res.render("503");
  }
});

module.exports = router;
