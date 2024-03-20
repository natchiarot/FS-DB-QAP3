var router = require("express").Router();
const reviewsDal = require("../../services/reviews.dal");

router.get("/:movie_id/postreview", (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    res.json(movie_id);
  } catch (error) {
    console.log("Error getting review form: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:movie_id/allreviews", async (req, res) => {
  try {
    let theReview = await reviewsDal.getReviewsById(req.params.movie_id);
    if (theReview.length > 0) {
      res.json(theReview);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log("Error getting a review by it's id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:movie_id/postreview", async (req, res) => {
  try {
    await reviewsDal.postReview(
      req.params.movie_id,
      req.body.rating,
      req.body.review_text
    );
    res.status(201).json({ message: "Created Success" });
  } catch (error) {
    console.log("Error adding new review: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
