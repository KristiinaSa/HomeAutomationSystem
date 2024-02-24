import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

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

export default System;
