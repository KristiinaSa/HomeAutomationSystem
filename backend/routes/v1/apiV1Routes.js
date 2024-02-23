import express from "express";
const apiV1Router = express.Router();

// Route imports
import automationRouter from "./automationRoutes.js";
import userRouter from "./userRoutes.js";
import roomRouter from "./roomRoutes.js";
import accessoryRouter from "./accessoryRoutes.js";
import router from "./loginRoutes.js";

apiV1Router.use("/automation", automationRouter);
apiV1Router.use("/users", userRouter);
apiV1Router.use("/rooms", roomRouter);
apiV1Router.use("/accessories", accessoryRouter);
apiV1Router.use("/login", router);

export default apiV1Router;