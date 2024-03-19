var router = require("express").Router();
const moviesDal = require("../../services/movies.dal");

// (GET) All movies
router.get("/", async (req, res) => {
  try {
    let theMovies = await moviesDal.getMovies();
    res.json(theMovies);
  } catch (error) {
    console.log("Error getting movies: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (GET) A movie by id
router.get("/:id", async (req, res) => {
  try {
    let theMovie = await moviesDal.getMoviesById(req.params.id);
    if (theMovie.length > 0) {
      res.json(theMovie);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log("Error getting a movie by it's id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (POST) Add a new movie
router.post("/", async (req, res) => {
  try {
    await moviesDal.postMovie(req.body.title, req.body.director);
    res.status(201).json({ message: "Created Success" });
  } catch (error) {
    console.log("Error adding new movie: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (PUT) Replace an existing movie
router.put("/:id", async (req, res) => {
  try {
    await moviesDal.putMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    console.log("Error replacing movie: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (PATCH) Edit an existing movie
router.patch("/:id", async (req, res) => {
  try {
    await moviesDal.patchMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (DELETE) A movie by its ids
router.delete("/:id", async (req, res) => {
  try {
    await moviesDal.deleteMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.release_date,
      req.body.description
    );
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
