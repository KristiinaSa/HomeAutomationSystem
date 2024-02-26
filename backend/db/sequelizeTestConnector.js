import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.TEST_DB_NAME,
  process.env.TEST_DB_USER,
  process.env.TEST_DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false,
  }
);

export default sequelize;
