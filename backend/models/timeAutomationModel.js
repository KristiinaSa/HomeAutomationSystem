import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class TimeAutomation extends Model {}

TimeAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    is_active: DataTypes.INTEGER,
    days_of_week: DataTypes.STRING,
    timestamp: DataTypes.STRING,
  },
  { sequelize, modelName: "time_automation" }
);

export default TimeAutomation;
