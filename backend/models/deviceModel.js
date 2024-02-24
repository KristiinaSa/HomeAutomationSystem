import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import System from "./systemModel.js";
import Room from "./roomModel.js";
import SensorAutomation from "./sensorAutomationModel.js";
import TimeAutomation from "./timeAutomationModel.js";
import UsageHistory from "./usageHistoryModel.js";

class Device extends Model {}

Device.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_type: DataTypes.STRING,
    device_model: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
    role_access: DataTypes.ENUM("admin", "user", "guest"),
    system_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "device" }
);

export default Device;
