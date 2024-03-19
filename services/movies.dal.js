const dal = require("./pgdb");

// Getting all the movies
var getMovies = function () {
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT movie_id, title, director FROM movies \
    ORDER BY movie_id ASC";
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
    VALUES ($1, $2)";
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

// PUT replacing movie with new title and director
var putMovie = function (id, title, director) {
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3 \
    WHERE movie_id = $1";
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

// PATCH editing movie title/ director
var patchMovie = function (id, title, director) {
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3 \
    WHERE movie_id = $1";
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

var deleteMovie = function (id) {
  return new Promise(function (resolve, reject) {
    const reviewSql = "DELETE FROM reviews WHERE movie_id = $1";
    dal.query(reviewSql, [id], (err) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
        return;
      }
    });

    const movieSql = "DELETE FROM movies WHERE movie_id = $1";
    dal.query(movieSql, [id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getMovies,
  getMoviesById,
  postMovie,
  putMovie,
  patchMovie,
  deleteMovie,
};
