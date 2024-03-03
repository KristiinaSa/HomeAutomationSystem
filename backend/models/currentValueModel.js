const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class CurrentValue extends Model {}

CurrentValue.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, defaultValue: "0" },
  },
  { sequelize, modelName: "currentvalue" }
);

module.exports = CurrentValue;
