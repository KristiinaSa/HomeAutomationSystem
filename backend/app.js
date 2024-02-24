import express from "express";

// Middleware imports
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import cron from "node-cron";

// Route imports
import apiV1Router from "./routes/v1/apiV1Router.js";

// Service imports
import checkAutomations from "./services/automationChecker.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short"));

app.get("/", (req, res) => {
  res.send("It Works!");
});

app.use("/api/v1", apiV1Router);

app.use(notFoundHandler);
app.use(errorHandler);

cron.schedule("* * * * *", checkAutomations);

export default app;
