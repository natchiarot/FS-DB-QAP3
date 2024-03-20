const express = require("express");
const router = express.Router();
const moviesDal = require("../services/movies.dal");
const moment = require("moment");

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

// (POST) movies by title and director
router.post("/", async (req, res) => {
  const { title, director, description } = req.body;
  let { release_date } = req.body;

  try {
    if (!title || !director || !release_date || !description) {
      console.log("Error: Invalid movie data.");
      return res.status(400).render("400");
    }

    // Parsing release_date string using Moment.js and formatting it to match the
    // format required by the postgresql database (YYYY-MM-DD).
    release_date = moment(release_date).format("YYYY-MM-DD");

    await moviesDal.postMovie(title, director, release_date, description);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

// PUT - replaces, for bigger edits
// (PUT) Replacing movie & director with new movie & director
router.get("/:id/replace", async (req, res) => {
  const movie = await moviesDal.getMoviesById(req.params.id);
  if (!movie || movie.length === 0) {
    console.log("Error: Movie not found.");
    res.render("404");
    return;
  }
  const { title, director, description } = movie[0];
  //   const id = parseInt(req.body.id);
  //   const title = req.body.title;
  //   const director = req.body.director;
  //   if (id === 0 || isNaN(id) || !title || !director) {
  //     console.log(
  //       "Error: Must enter a valid ID, a movie title and its director."
  //     );
  //     res.render("400");
  //     return;
  //   }

  try {
    res.render("putmovie", {
      anId: req.params.id,
      title: title,
      director: director,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

// PATCH - edits
// (PATCH) Editing movie title/director
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await moviesDal.getMoviesById(req.params.id);
    if (!movie || movie.length === 0) {
      console.log("Error: Movie not found.");
      res.render("404");
      return;
    }
    const { title, director, description } = movie[0];

    res.render("patchmovie", {
      anId: req.params.id,
      title: title,
      director: director,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

// DELETE - removes
// (DELETE) Removies a movie by its id
router.get("/:id/delete", async (req, res) => {
  try {
    const movie = await moviesDal.getMoviesById(req.params.id);
    if (!movie || movie.length === 0) {
      console.log("Error: Movie not found.");
      res.render("404");
      return;
    }

    const { title, director, release_date, description } = movie[0];

    res.render("deletemovie", {
      anId: req.params.id,
      title: title,
      director: director,
      release_date: release_date,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

//
// HTTP methods
// * that AREN'T apart of HTML

// (PUT) replace movie & director
router.put("/:id", async (req, res) => {
  //   console.log(id);
  try {
    await moviesDal.putMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await moviesDal.patchMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await moviesDal.deleteMovie(
      req.params.id,
      req.title,
      req.director,
      req.body.release_date,
      req.body.description
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

module.exports = router;
