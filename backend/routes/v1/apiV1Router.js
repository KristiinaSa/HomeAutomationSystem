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

apiV1Router.use(
  "/automations",
  authenticateToken,
  getUserData,
  automationRouter
);
apiV1Router.use("/users", authenticateToken, getUserData, userRouter);
apiV1Router.use("/rooms", authenticateToken, getUserData, roomRouter);
apiV1Router.use(
  "/accessories",
  authenticateToken,
  getUserData,
  accessoryRouter
);
apiV1Router.use("/login", loginRouter);
apiV1Router.use("/status", authenticateToken, getUserData, statusRouter);

module.exports = apiV1Router;
