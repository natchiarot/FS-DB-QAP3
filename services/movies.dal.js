const dal = require("./pgdb");

// Getting all the movies
var getMovies = function () {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM movies";
    dal.query(sql, [], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Getting movie by id
var getMoviesById = function (id) {
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT movie_id, title, director FROM movies WHERE movie_id =$1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { getMovies, getMoviesById };
