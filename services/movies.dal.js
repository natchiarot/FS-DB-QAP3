const dal = require("./pgdb");

// Getting all the movies
var getMovies = function () {
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT movies.movie_id, movies.title, movies.release_date, movies.director, movies.description, movies.poster_url, genres.genre_name \
       FROM movies \
      Inner JOIN genres ON movies.genre_id=genres.genre_id \
      ORDER BY movie_id ASC LIMIT 50";
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
      "SELECT movies.movie_id, movies.title, movies.release_date, movies.director, movies.description, movies.poster_url, genres.genre_name \
    FROM movies \
   Inner JOIN genres ON movies.genre_id=genres.genre_id \
    WHERE movie_id =$1";
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
var postMovie = function (title, director, release_date, description) {
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO movies (title, release_date, director, description) \
    VALUES ($1, $3, $2, $4)";
    dal.query(
      sql,
      [title, release_date, director, description],
      (err, result) => {
        if (err) {
          console.log("Error: ", err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

// PUT replacing movie with new title and director
var putMovie = function (id, title, director, description) {
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3, description = $4 \
    WHERE movie_id = $1";
    dal.query(sql, [id, title, director, description], (err, result) => {
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
var patchMovie = function (id, title, director, description) {
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3, description = $4 \
    WHERE movie_id = $1";
    dal.query(sql, [id, title, director, description], (err, result) => {
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
