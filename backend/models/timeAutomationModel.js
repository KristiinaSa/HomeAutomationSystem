import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class TimeAutomation extends Model {}

TimeAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    weekdays: DataTypes.INTEGER,
    time: DataTypes.STRING,
  },
  { sequelize, modelName: "time_automation" }
);

export default TimeAutomation;
