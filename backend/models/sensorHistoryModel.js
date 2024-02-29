const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class SensorHistory extends Model {}

SensorHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
  },
  { sequelize, modelName: "sensorHistory" }
);

module.exports = SensorHistory;
