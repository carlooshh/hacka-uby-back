import dotenv from "dotenv";
dotenv.config();

const mysql = require("mysql");
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timeout: 60 * 60 * 1000,
});

export default dbConnection;
