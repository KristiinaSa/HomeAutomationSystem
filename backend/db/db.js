const sequelizeConnector = require("./sequelizeConnector.js");
const sequelizeTestConnector = require("./sequelizeTestConnector.js");

function getSequelize() {
  if (process.env.NODE_ENV === "test") {
    return sequelizeTestConnector;
  } else {
    return sequelizeConnector;
  }
}

module.exports = getSequelize;
