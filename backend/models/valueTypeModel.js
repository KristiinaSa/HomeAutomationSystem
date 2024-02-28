const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class ValueType extends Model {}

ValueType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: DataTypes.STRING,
    unit: DataTypes.STRING,
  },
  { sequelize, modelName: "valueType" }
);

module.exports = ValueType;
