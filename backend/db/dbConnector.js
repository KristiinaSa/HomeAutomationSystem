import mysql from "mysql2/promise";

async function sqlQuery(sql, params) {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: "host.docker.internal",
      user: "root",
      password: "7hXr6VUUB9zyaAC8eaUy",
    });
    const [results] = await conn.execute(sql, params);
    console.log(results);
    return results;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

export { sqlQuery };
