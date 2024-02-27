import { Model, DataTypes } from "sequelize";
import getSequelize from "../db/db.js";

const sequelize = getSequelize();

class SensorAutomation extends Model {}

SensorAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    threshold_value: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    threshold_type: DataTypes.STRING,
    action: DataTypes.STRING,
  },
  { sequelize, modelName: "sensorAutomation" }
);

export default SensorAutomation;
