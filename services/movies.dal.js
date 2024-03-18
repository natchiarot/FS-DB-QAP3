const dal = require("./pgdb");

// Getting all the movies
var getMovies = function () {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM movies";
    dal.query(sql, [], (err, result) => {
      if (err) {
        console.log("Error - ", err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { getMovies };
