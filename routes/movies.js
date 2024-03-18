const express = require("express");
const router = express.Router();
const moviesDal = require("../services/movies.dal");

// (GET) Displaying all movies to UI
router.get("/", async (req, res) => {
  //   const theMovies = [
  //     { title: "Pulp Fiction", director: "Quentin Tarentino" },
  //     { title: "Jurassic Park", director: "Stephen Spielberg" },
  //     { title: "Raiders of the Lost Ark", director: "Stephen Spielberg" },
  //   ];
  try {
    let theMovies = await moviesDal.getMovies();
    // if (DEBUG) console.table(theMovies);
    res.render("movies", { theMovies });
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

// (GET) Movies by id
router.get("/:id", async (req, res) => {
  //   const theMovie = [{ title: "Jaws", director: "Stephen Spielberg" }];
  const id = parseInt(req.params.id);
  if (id === 0 || isNaN(id)) {
    console.log("Error: Invalid ID provided");
    res.render("400");
    return;
  }

  try {
    let theMovie = await moviesDal.getMoviesById(req.params.id);
    if (theMovie && theMovie.length > 0) {
      res.render("movie", { theMovie });
    } else {
      console.log("Error: The ID entered does not exist.");
      res.render("404");
    }
  } catch (error) {
    console.log(error);
    res.render("500");
  }
});

module.exports = router;
