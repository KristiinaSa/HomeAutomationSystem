import { Model, DataTypes } from "sequelize";
import getSequelize from "../db/db.js";

const sequelize = getSequelize();

class UsageHistory extends Model {}

UsageHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
  },
  { sequelize, modelName: "usageHistory" }
);

export default UsageHistory;
