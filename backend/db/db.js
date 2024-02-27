import sequelizeConnector from "./sequelizeConnector.js";
import sequelizeTestConnector from "./sequelizeTestConnector.js";

export default function getSequelize() {
  if (process.env.NODE_ENV === "test") {
    return sequelizeTestConnector;
  } else {
    return sequelizeConnector;
  }
}
