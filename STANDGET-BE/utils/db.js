// config/database.js

import { Sequelize } from "sequelize";
import 'dotenv/config'; // Ensure dotenv is loaded

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

export default sequelize;
