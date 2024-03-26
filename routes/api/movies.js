// Importing modules
var router = require("express").Router();
const moviesDal = require("../../services/movies.dal");

// (GET) All movies
router.get("/", async (req, res) => {
  try {
    // Calling DAL function to get all movies
    let theMovies = await moviesDal.getMovies();
    // Sending response with fetched movies in json format
    res.json(theMovies);
  } catch (error) {
    // Logging error if it occured while fetching movies
    console.log("Error getting movies: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (GET) A movie by its id
router.get("/:id", async (req, res) => {
  try {
    // Calling DAL function to get a movie by its id
    let theMovie = await moviesDal.getMoviesById(req.params.id);
    // Checking to see if the movie exists
    if (theMovie.length > 0) {
      // If it exists, send it in response
      res.json(theMovie);
    } else {
      // If it doesn't exist, send 404 response
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    // Logging error if it occured while fetching a movie by its id
    console.log("Error getting a movie by it's id: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (POST) Add a new movie
router.post("/", async (req, res) => {
  try {
    // Call DAL function to add a new movie with the provided data
    await moviesDal.postMovie(
      req.body.title,
      req.body.release_date,
      req.body.director,
      req.body.description
    );
    // Send 201 response
    res.status(201).json({ message: "Created Success" });
  } catch (error) {
    // Logging error to console if one occured while adding a new movie
    console.log("Error adding new movie: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (PUT) Replace an existing movie
router.put("/:id", async (req, res) => {
  try {
    // Call DAL function to replace an existing movie with the provided data
    await moviesDal.putMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    // Send 200 response
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    // Logging error if any occured while replacing a movie
    console.log("Error replacing movie: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (PATCH) Edit an existing movie
router.patch("/:id", async (req, res) => {
  try {
    // Call DAL function to edit an existing movie with the provided data
    await moviesDal.patchMovie(
      req.params.id,
      req.body.title,
      req.body.director,
      req.body.description
    );
    // Send 200 response
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    // Logging error if any occured while editing a movie
    console.log("Error: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// (DELETE) A movie by its ids
router.delete("/:id", async (req, res) => {
  try {
    // Call DAL function to delete a movie by its id
    await moviesDal.deleteMovie(req.params.id);
    // Send 200 response
    res.status(200).json({ message: "OK Success" });
  } catch (error) {
    // Logging error if any occured while deleting a movie
    console.log("Error: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});
