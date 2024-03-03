const express = require("express");
const apiV1Router = express.Router();

// Route imports
const automationRouter = require("./automationRoutes.js");
const userRouter = require("./userRoutes.js");
const roomRouter = require("./roomRoutes.js");
const accessoryRouter = require("./accessoryRoutes.js");
const loginRouter = require("./loginRoutes.js");
const statusRouter = require("./statusRouter.js");

apiV1Router.use("/automations", automationRouter);
apiV1Router.use("/users", userRouter);
apiV1Router.use("/rooms", roomRouter);
apiV1Router.use("/accessories", accessoryRouter);
apiV1Router.use("/login", loginRouter);
apiV1Router.use("/status", statusRouter);

module.exports = apiV1Router;
