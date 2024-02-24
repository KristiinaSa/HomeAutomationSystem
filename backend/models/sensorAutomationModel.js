import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class SensorAutomation extends Model {}

SensorAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    threshold_value: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    threshold_type: DataTypes.STRING,
    action: DataTypes.STRING,
    sensor_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "sensor_automation" }
);

export default SensorAutomation;
