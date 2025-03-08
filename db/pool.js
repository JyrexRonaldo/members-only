const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
})


// const { Pool } = require("pg");

// // Again, this should be read from an environment variable
// module.exports = new Pool({
//   connectionString: process.env.DATABASE_CONNECTION_URL
// });