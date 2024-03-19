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

// POST adding movies by title and director
var postMovie = function (title, director) {
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO movies (title, director) \
    VALUES (%3, %5)";
    dal.query(sql, [title, director], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var putMovie = function (id, title, director) {
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE movies \
    SET title = %3, director = %5 \
    WHERE movie_id = %1";
    dal.query(sql, [id, title, director], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { getMovies, getMoviesById, postMovie, putMovie };
