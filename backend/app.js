const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const errorHandler = require("./middleware/errorHandler.js");
const notFoundHandler = require("./middleware/notFoundHandler.js");

const apiV1Router = require("./routes/v1/apiV1Router.js");

const checkAutomations = require("./services/automationChecker.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", apiV1Router);

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.RUN_CRON_JOB !== "false") {
  cron.schedule("* * * * *", () => {
    try {
      checkAutomations();
    } catch (error) {
      console.error("Error running automation:", error);
    }
  });
}

module.exports = app;
