const express = require("express");
const router = express.Router(); // Creating a router instance
const moviesDal = require("../services/movies.dal"); // Importing DAL for movies
const moment = require("moment"); // Importing moment.js library for date handling

// (GET) Displaying all movies to UI
router.get("/", async (req, res) => {
  //   const theMovies = [
  //     { title: "Pulp Fiction", director: "Quentin Tarentino" },
  //     { title: "Jurassic Park", director: "Stephen Spielberg" },
  //     { title: "Raiders of the Lost Ark", director: "Stephen Spielberg" },
  //   ];
  try {
    // Fetching all movies from the DAL
    let theMovies = await moviesDal.getMovies();
    // if (DEBUG) console.table(theMovies);
    // Rendering the 'movies' template with the fetched movies data
    res.render("movies", { theMovies });
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (GET) Displaying a single movie by its id
router.get("/:id", async (req, res) => {
  try {
    // Fetching a movie by its id from the DAL
    let theMovie = await moviesDal.getMoviesById(req.params.id);
    if (theMovie && theMovie.length > 0) {
      // Rendering the 'movie' template with fetched movie data
      res.render("movie", { theMovie });
    } else {
      console.log("Error: The ID entered does not exist.");
      // Rendering the '404' template if the movie is not found
      res.render("404");
    }
  } catch (error) {
    console.log(error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (POST) Adding a new movie
router.post("/", async (req, res) => {
  const { title, director, description } = req.body;
  let { release_date } = req.body;

  try {
    // Validating movie data
    if (!title || !director || !release_date || !description) {
      console.log("Error: Invalid movie data.");
      return res.status(400).render("400");
    }

    // Parsing release_date string using Moment.js and formatting it to match the
    // format required by the postgresql database (YYYY-MM-DD).
    release_date = moment(release_date).format("YYYY-MM-DD");

    // Adding a new movie using data from the request body
    await moviesDal.postMovie(title, director, release_date, description);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (GET) Rendering a form to (PUT) replace a movie
router.get("/:id/replace", async (req, res) => {
  try {
    // Fetching a movie by its id from the DAL
    const movie = await moviesDal.getMoviesById(req.params.id);
    if (!movie || movie.length === 0) {
      console.log("Error: Movie not found.");
      // Rendering the '404' template if the movie is not found
      res.render("404");
      return;
    }
    const { title, director, description } = movie[0];

    // Rendering the 'putmovie' template with fetched movie data
    res.render("putmovie", {
      anId: req.params.id,
      title: title,
      director: director,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (GET) Rendering a form to (PATCH) edit a movie
router.get("/:id/edit", async (req, res) => {
  try {
    // Fetching a movie by its id from the DAL
    const movie = await moviesDal.getMoviesById(req.params.id);
    if (!movie || movie.length === 0) {
      console.log("Error: Movie not found.");
      // Rendering the '404' template if the movie is not found
      res.render("404");
      return;
    }
    const { title, director, description } = movie[0];

    // Rendering the 'patchmovie' template with fetched movie data
    res.render("patchmovie", {
      anId: req.params.id,
      title: title,
      director: director,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (GET) Rendering a form to (DELETE) remove a movie
router.get("/:id/delete", async (req, res) => {
  try {
    // Fetching a movie by its id from the DAL
    const movie = await moviesDal.getMoviesById(req.params.id);
    if (!movie || movie.length === 0) {
      console.log("Error: Movie not found.");
      // Rendering the '404' template if the movie is not found
      res.render("404");
      return;
    }

    const { title, director, release_date, description } = movie[0];

    // Rendering the 'deletemovie' template with fetched movie data
    res.render("deletemovie", {
      anId: req.params.id,
      title: title,
      director: director,
      release_date: release_date,
      description: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

//
// HTTP methods
// * that AREN'T apart of HTML

// (PUT) replacing a movie by its id
router.put("/:id", async (req, res) => {
  try {
    // Replacing a movie with new data using data from the request body
    await moviesDal.putMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (PATCH) Editing a movie by its id
router.patch("/:id", async (req, res) => {
  try {
    // Editing a movie with new data using dat from the request body
    await moviesDal.patchMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (DELETE) Removing a movie by its id
router.delete("/:id", async (req, res) => {
  try {
    // Deleting a movie by its id
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
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// Exporting the router
module.exports = router;
