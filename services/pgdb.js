// Just for connecting to DB
const Pool = require("pg").Pool; // Connection pool
const pool = new Pool({
  user: "nat",
  host: "localhost",
  database: "MovieArchive",
  password: "supersecretconfidentialpassword",
  port: 5432,
});
module.exports = pool;
