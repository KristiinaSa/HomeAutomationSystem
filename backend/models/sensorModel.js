import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class Sensor extends Model {}

Sensor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    value: { type: DataTypes.STRING, defaultValue: "0" },
    data_type: DataTypes.STRING,
    role_access: {
      type: DataTypes.ENUM("owner", "admin", "resident"),
      defaultValue: "owner",
    },
  },
  { sequelize, modelName: "sensor" }
);

export default Sensor;
