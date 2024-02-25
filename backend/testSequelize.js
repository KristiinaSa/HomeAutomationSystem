import sequelize from "./db/sequelizeConnector.js";

const testSequelize = async () => {
  console.log("Testing database connection...");
  try {
    await sequelize.authenticate();
    console.log("Database connection is working correctly");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
};

testSequelize();
