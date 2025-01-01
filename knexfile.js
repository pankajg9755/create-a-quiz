import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const initializeDatabase = {
  development: {
    client: process.env.DB_DIALECT || "mysql2",
    connection: {
      host: process.env.DB_HOST || "wfsdb.mysql.database.azure.com",
      user: process.env.DB_USER || "wfsadmin",
      password: process.env.DB_PASSWORD || "worldofstones@123",
      database: process.env.DB_NAME || "quizApp",
    },
    debug: false,
    pool: {
      min: 2,
      max: 10,
    },
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    seeds: {
      directory: ["./db/seeds"],
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "js",
      directory: ["./db/migrations"],
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },

    debug: false,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: ["./db/seeds"],
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "js",
      directory: ["./db/migrations"],
    },
  },
};
export default initializeDatabase;
