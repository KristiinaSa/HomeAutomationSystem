import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import SensorHistory from "./sensorHistoryModel.js";
import Room from "./roomModel.js";
import System from "./systemModel.js";

class Sensor extends Model {}

Sensor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sensor_type: DataTypes.STRING,
    value: DataTypes.STRING,
    data_type: DataTypes.STRING,
    role_access: DataTypes.ENUM("owner", "admin", "resident"),
    room_id: DataTypes.INTEGER,
    system_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "sensor" }
);

export default Sensor;
