const dal = require("./pgdb");

// Function to get reviews for a specific movie by its id
var getReviewsById = function (movie_id) {
  return new Promise(function (resolve, reject) {
    // SQL query to retrieve reviews for a specific movie
    const sql = `SELECT 
        rating,
        review_text
      FROM reviews 
      WHERE movie_id = $1`;
    dal.query(sql, [movie_id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve with fetched review data
        resolve(result.rows);
      }
    });
  });
};

// Function to add a new review for a movie
var postReview = function (movie_id, rating, review_text) {
  return new Promise(function (resolve, reject) {
    // SQL query to insert a new review for a movie
    const sql =
      "INSERT INTO reviews (movie_id, rating, review_text) \
    VALUES ($1, $2, $3)";
    dal.query(sql, [movie_id, rating, review_text], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve after adding the review
        resolve(result.rows);
      }
    });
  });
};

// Exporting functions for external use
module.exports = { getReviewsById, postReview };
