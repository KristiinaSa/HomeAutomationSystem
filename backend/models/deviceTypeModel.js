const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class DeviceType extends Model {}

DeviceType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.ENUM,
      values: ["light", "tv", "fan"],
    },
  },
  { sequelize, modelName: "device_type" }
);

module.exports = DeviceType;
