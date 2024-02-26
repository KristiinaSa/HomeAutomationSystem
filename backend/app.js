import express from "express";

import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";

import apiV1Router from "./routes/v1/apiV1Router.js";

import checkAutomations from "./services/automationChecker.js";

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

export default app;
