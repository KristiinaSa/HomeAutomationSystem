const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const automationRouter = require("./routes/automationRoutes");
const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
const accessoryRouter = require("./routes/accessoryRoutes");

app.use("/automation", automationRouter);
app.use("/users", userRouter);
app.use("/rooms", roomRouter);
app.use("/accessories", accessoryRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
