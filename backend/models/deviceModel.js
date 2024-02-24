import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class Device extends Model {}

Device.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_name: DataTypes.STRING,
    device_type: DataTypes.STRING,
    device_model: DataTypes.STRING,
    sensor_value: { type: DataTypes.STRING, defaultValue: "0" },
    data_type: DataTypes.STRING,
    role_access: {
      type: DataTypes.ENUM("owner", "admin", "resident"),
      defaultValue: "owner",
    },
    system_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "device" }
);

export default Device;
