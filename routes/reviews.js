const express = require("express");
const router = express.Router();
const reviewsDal = require("../services/reviews.dal");

// (GET)
router.get("/:movie_id/postreview", (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    res.render("postreview", { movie_id });
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

router.get("/:movie_id/allreviews", async (req, res) => {
  try {
    let theReview = await reviewsDal.getReviewsById(req.params.movie_id);
    if (theReview && theReview.length > 0) {
      res.render("allreviews", { theReview });
    } else {
      console.log("Error: The ID entered does not exist.");
      res.render("404");
    }
  } catch (error) {
    console.log(error);
    res.render("500");
  }
});

// (POST) A review
router.post("/:movie_id/postreview", async (req, res) => {
  let movie_id = req.params.movie_id;
  const { rating, review_text } = req.body;
  try {
    if (!movie_id || !rating || !review_text) {
      console.log("Error: Invalid review data.");
      return res.status(400).render("400");
    }

    if (isNaN(movie_id) || movie_id.trim() === "") {
      console.log("Error: Invalid movie ID format.");
      return res.status(400).json({ message: "Invalid movie ID format" }); // Example error response
    }

    movie_id = parseInt(movie_id);
    await reviewsDal.postReview(movie_id, rating, review_text);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error: ", error);
    res.render("500");
  }
});

module.exports = router;
