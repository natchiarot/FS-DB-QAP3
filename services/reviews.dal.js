const dal = require("./pgdb");

var getReviewsById = function (movie_id) {
  return new Promise(function (resolve, reject) {
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
        resolve(result.rows);
      }
    });
  });
};

var postReview = function (movie_id, rating, review_text) {
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO reviews (movie_id, rating, review_text) \
    VALUES ($1, $2, $3)";
    dal.query(sql, [movie_id, rating, review_text], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { getReviewsById, postReview };
