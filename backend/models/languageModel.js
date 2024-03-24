const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class Language extends Model {}

Language.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, defaultValue: "en" },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "language" }
);

module.exports = Language;
