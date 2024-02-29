const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class UsageHistory extends Model {}

UsageHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
  },
  { sequelize, modelName: "usageHistory" }
);

module.exports = UsageHistory;
