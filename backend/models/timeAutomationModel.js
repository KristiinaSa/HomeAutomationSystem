import { Model, DataTypes } from "sequelize";
import getSequelize from "../db/db.js";

const sequelize = getSequelize();

class TimeAutomation extends Model {}

TimeAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    weekdays: DataTypes.INTEGER,
    time: DataTypes.STRING,
    type: { type: DataTypes.STRING, defaultValue: "timer" },
  },
  { sequelize, modelName: "timeAutomation" }
);

export default TimeAutomation;
