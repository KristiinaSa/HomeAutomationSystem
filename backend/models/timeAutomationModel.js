const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class TimeAutomation extends Model {}

TimeAutomation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    weekdays: DataTypes.INTEGER,
    time: DataTypes.STRING,
    type: { type: DataTypes.STRING, defaultValue: "timer" },
    action: { type: DataTypes.STRING, defaultValue: "off" },
  },
  { sequelize, modelName: "timeAutomation" }
);

module.exports = TimeAutomation;
