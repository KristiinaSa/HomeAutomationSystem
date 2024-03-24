const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class Setting extends Model {}

Setting.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: { type: DataTypes.STRING, defaultValue: "en-US" },
    using_darkmode: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  { sequelize, modelName: "setting" }
);

module.exports = Setting;
