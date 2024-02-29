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
  },
  { sequelize, modelName: "system" }
);

module.exports = System;
