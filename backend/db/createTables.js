const sequelize = require("./sequelizeConnector.js");
require("./associations.js");

const Device = require("../models/deviceModel.js");
const Room = require("../models/roomModel.js");
const SensorAutomation = require("../models/sensorAutomationModel.js");
const SensorHistory = require("../models/sensorHistoryModel.js");
const Sensor = require("../models/sensorModel.js");
const Setting = require("../models/settingModel.js");
const System = require("../models/systemModel.js");
const TimeAutomation = require("../models/timeAutomationModel.js");
const User = require("../models/userModel.js");
const Language = require("../models/languageModel.js");
const Translation = require("../models/translationModel.js");
const models = require("../models/transModel.js");
const EnTranslation = models.EnTranslation;
const FiTranslation = models.FiTranslation;
const JpTranslation = models.JpTranslation;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models were synchronized successfully.");
    return sequelize.close();
  })
  .then(() => {
    console.log("Connection closed.");
  })
  .catch((error) => {
    console.error("Error syncing models: ", error);
  });
