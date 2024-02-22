import { sqlQuery } from "./db/dbConnector.js";

async function testConnection() {
  console.log("Testing database connection...");
  try {
    const result = await sqlQuery("SELECT 1");
    console.log("Database connection is working correctly");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

testConnection();
