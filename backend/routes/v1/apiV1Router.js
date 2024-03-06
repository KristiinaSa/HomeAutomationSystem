const express = require("express");
const apiV1Router = express.Router();

// Route imports
const automationRouter = require("./automationRoutes.js");
const userRouter = require("./userRoutes.js");
const roomRouter = require("./roomRoutes.js");
const accessoryRouter = require("./accessoryRoutes.js");
const loginRouter = require("./loginRoutes.js");
const statusRouter = require("./statusRouter.js");

// Middleware imports¨
const authenticateToken = require("../../middleware/authToken.js");
const getUserData = require("../../middleware/getUserData.js");

apiV1Router.use("/automations", automationRouter);
apiV1Router.use("/users", userRouter);
apiV1Router.use("/rooms", roomRouter);
apiV1Router.use("/accessories", accessoryRouter);
apiV1Router.use("/login", loginRouter);
apiV1Router.use("/status", statusRouter);
apiV1Router.get("/", authenticateToken, getUserData, (req, res) => {
  res.status(200).json({ message: "Welcome to the home automation API" });
});

module.exports = apiV1Router;
