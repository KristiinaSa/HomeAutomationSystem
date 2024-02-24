import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import Sensor from "./sensorModel.js";

class SensorHistory extends Model {}

SensorHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
  },
  { sequelize, modelName: "sensor_history" }
);

export default SensorHistory;
