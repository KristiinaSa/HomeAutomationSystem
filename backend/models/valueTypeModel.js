import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

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
