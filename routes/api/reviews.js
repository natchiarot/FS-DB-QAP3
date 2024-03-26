// Importing modules
var router = require("express").Router();
const reviewsDal = require("../../services/reviews.dal");

// Route to render review form for a movie
router.get("/:movie_id/postreview", (req, res) => {
  try {
    // Extracting the movie_id from request parameters
    const movie_id = req.params.movie_id;
    // Sending movie_id as JSON response
    res.json(movie_id);
  } catch (error) {
    // Handling any errors that occur
    console.log("Error getting review form: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all reviews for a movie
router.get("/:movie_id/allreviews", async (req, res) => {
  try {
    // Fetching all reviews for a movie by its movie_id
    let theReview = await reviewsDal.getReviewsById(req.params.movie_id);
    // Checking if reviews exist
    if (theReview.length > 0) {
      // If reviews exist, sending them as JSON response
      res.json(theReview);
    } else {
      // If no reviews found, sending 404 response
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    // Handling any errors that occur
    console.log("Error getting a review by it's id: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to post a new review for a movie
router.post("/:movie_id/postreview", async (req, res) => {
  try {
    // Adding a new review for a movie with the provided data
    await reviewsDal.postReview(
      req.params.movie_id,
      req.body.rating,
      req.body.review_text
    );
    // Sending a 201 response when successfully added
    res.status(201).json({ message: "Created Success" });
  } catch (error) {
    // Handling any errors that occur
    console.log("Error adding new review: ", error);
    // Sending 500 error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});
