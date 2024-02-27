import { Model, DataTypes } from "sequelize";
import getSequelize from "../db/db.js";

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

export default ValueType;
