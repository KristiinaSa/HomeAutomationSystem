import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import Device from "./deviceModel.js";
import User from "./userModel.js";

class UsageHistory extends Model {}

UsageHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
  },
  { sequelize, modelName: "usage_history" }
);

export default UsageHistory;
