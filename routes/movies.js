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
  //   const title = req.body.title;
  //   const director = req.body.director;
  //   if (!title || !director) {
  //     console.log("Error: must enter a movie title and its director.");
  //     res.render("400");
  //     return;
  //   }
  try {
    await moviesDal.postMovie(req.body.title, req.body.director);
    res.redirect("movies");
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
  const { title, director } = movie[0];
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
    const { title, director } = movie[0];

    res.render("patchmovie", {
      anId: req.params.id,
      title: title,
      director: director,
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

    const { title, director } = movie[0];

    res.render("deletemovie", {
      anId: req.params.id,
      title: title,
      director: director,
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
    await moviesDal.putMovie(req.params.id, req.body.title, req.body.director);
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
      req.body.director
    );
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await moviesDal.deleteMovie(req.params.id, req.title, req.director);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

module.exports = router;
