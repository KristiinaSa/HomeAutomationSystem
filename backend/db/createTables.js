import sequelize from "./sequelizeConnector.js";
import "./associations.js";

import Device from "../models/deviceModel.js";
import Room from "../models/roomModel.js";
import SensorAutomation from "../models/sensorAutomationModel.js";
import SensorHistory from "../models/sensorHistoryModel.js";
import Sensor from "../models/sensorModel.js";
import Setting from "../models/settingModel.js";
import System from "../models/systemModel.js";
import TimeAutomation from "../models/timeAutomationModel.js";
import User from "../models/userModel.js";

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error syncing models: ", error);
  });
