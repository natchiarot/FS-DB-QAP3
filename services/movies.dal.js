const dal = require("./pgdb");

// Function to get all the movies with associated genres and reviews
var getMovies = function () {
  return new Promise(function (resolve, reject) {
    // SQL query to retrieve the movies with the associated genres and reviews
    const sql = `SELECT 
      movies.movie_id, 
      movies.title, 
      movies.release_date,
      movies.director, 
      movies.description, 
      movies.poster_url, 
      genres.genre_name,
      reviews.review_id,
      reviews.rating,
      reviews.review_text
    FROM movies 
    INNER JOIN 
      genres ON movies.genre_id=genres.genre_id 
    LEFT JOIN 
      reviews ON movies.movie_id = reviews.movie_id
    ORDER BY
      movies.movie_id DESC
    LIMIT 25`;
    // LEFT JOIN returns all records from the left table (movies)
    // to ensure that even if the movie doesn't have any reviews it will still
    // be included.
    dal.query(sql, [], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve with fetched movie data
        resolve(result.rows);
      }
    });
  });
};

// Function to get a movie by its id with associated genre and reviews
var getMoviesById = function (id) {
  return new Promise(function (resolve, reject) {
    // SQL query to retrieve a movie by its id with the associated genre and reviews
    const sql = `SELECT 
    movies.movie_id, 
    movies.title, 
    movies.release_date,
    movies.director, 
    movies.description, 
    movies.poster_url, 
    genres.genre_name,
    reviews.review_id,
    reviews.rating,
    reviews.review_text
  FROM movies 
  INNER JOIN 
    genres ON movies.genre_id=genres.genre_id 
  LEFT JOIN 
    reviews ON movies.movie_id = reviews.movie_id
  WHERE movies.movie_id =$1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve with fetched movie data
        resolve(result.rows);
      }
    });
  });
};

// Function to add a new movie to the database
var postMovie = function (title, release_date, director, description) {
  return new Promise(function (resolve, reject) {
    // Debugging when I was having trouble with adding a movie
    // console.log("Title:", title);
    // console.log("Release Date:", release_date);
    // console.log("Director:", director);
    // console.log("Description:", description);

    // SQL query to insert a new movie
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
          // Resolve after adding the movie
          resolve(result.rows);
        }
      }
    );
  });
};

// Function to replace a movie's title, director, and description by its id
var putMovie = function (id, title, director, description) {
  return new Promise(function (resolve, reject) {
    // SQL query to update a movie's title, director, and description
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3, description = $4 \
    WHERE movies.movie_id = $1";
    dal.query(sql, [id, title, director, description], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve after updating the movie
        resolve(result.rows);
      }
    });
  });
};

// Function to edit a movie's title, director, and description by its id
var patchMovie = function (id, title, director, description) {
  return new Promise(function (resolve, reject) {
    // SQL query to update a movie's title, director, and description
    const sql =
      "UPDATE movies \
    SET title = $2, director = $3, description = $4 \
    WHERE movies.movie_id = $1";
    dal.query(sql, [id, title, director, description], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve after updating the movie
        resolve(result.rows);
      }
    });
  });
};

// Function to delete a movie and its associated reviews by its id
var deleteMovie = function (id) {
  return new Promise(function (resolve, reject) {
    // SQL query to delete reviews associated with the movie
    const reviewSql = "DELETE FROM reviews WHERE movie_id = $1";
    dal.query(reviewSql, [id], (err) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
        return;
      }
    });

    // SQL query to delete the movie
    const movieSql = "DELETE FROM movies WHERE movie_id = $1";
    dal.query(movieSql, [id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        // Resolve after deleting the movie
        resolve(result.rows);
      }
    });
  });
};

// Exporting functions for external use
module.exports = {
  getMovies,
  getMoviesById,
  postMovie,
  putMovie,
  patchMovie,
  deleteMovie,
};
