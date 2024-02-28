const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

async function sqlQuery(sql, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    const results = await conn.query(sql, params);
    console.log(results);
    return results;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { pool, sqlQuery };
