import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  debug: true,
  pool: {
    min: 2, // Minimum number of connections in the pool
    max: 20, // Maximum number of connections in the pool
    acquireTimeoutMillis: 30000, // Maximum time (in milliseconds) to acquire a connection
    idleTimeoutMillis: 10000, // Maximum time (in milliseconds) a connection can be idle
  },
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

// Attempt to establish the database connection
Knex.raw("SELECT * from users")
  .then(() => {
    console.log("Connection to the database was successful.");
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

export default Knex;
