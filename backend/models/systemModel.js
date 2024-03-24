const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class System extends Model {}

System.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, defaultValue: "Home" },
    time_zone: { type: DataTypes.STRING, defaultValue: "Europe/Helsinki" },
  },
  { sequelize, modelName: "system" }
);

module.exports = System;
