const express = require("express");
const router = express.Router(); // Creating a router instance
const reviewsDal = require("../services/reviews.dal"); // Importing DAL for reviews

// (GET) Rendering a form to post a review for a movie
router.get("/:movie_id/postreview", (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    // Rendering the 'postreview' template with the movie_id parameter
    res.render("postreview", { movie_id });
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (GET) Rendering all reviews for a movie
router.get("/:movie_id/allreviews", async (req, res) => {
  try {
    // Fetching all reviews for a movie by its id from the DAL
    let theReview = await reviewsDal.getReviewsById(req.params.movie_id);
    if (theReview && theReview.length > 0) {
      // Rendering the 'allreviews' template with fetched review data
      res.render("allreviews", { theReview });
    } else {
      console.log("Error: The ID entered does not exist.");
      // Rendering the '404' template if no reviews are found for the movie
      res.render("404");
    }
  } catch (error) {
    console.log(error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// (POST) Posting a review for a movie
router.post("/:movie_id/postreview", async (req, res) => {
  let movie_id = req.params.movie_id;
  const { rating, review_text } = req.body;
  try {
    // Validating review data
    if (!movie_id || !rating || !review_text) {
      console.log("Error: Invalid review data.");
      return res.status(400).render("400");
    }

    // Validating movie_id format
    if (isNaN(movie_id) || movie_id.trim() === "") {
      console.log("Error: Invalid movie ID format.");
      return res.status(400).json({ message: "Invalid movie ID format" }); // Example error response
    }

    movie_id = parseInt(movie_id);
    // Posting a new review using data from the request body
    await reviewsDal.postReview(movie_id, rating, review_text);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    // Rendering the '500' template in case of an error
    res.render("500");
  }
});

// Exporting the router
module.exports = router;
