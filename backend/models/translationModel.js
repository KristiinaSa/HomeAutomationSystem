const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class Translation extends Model {}

Translation.init(
  {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    language: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "translations",
    timestamps: false,
  }
);

module.exports = Translation;
