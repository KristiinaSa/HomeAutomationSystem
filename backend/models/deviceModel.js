import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class Device extends Model {}

Device.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_name: DataTypes.STRING,
    device_type: DataTypes.STRING,
    device_model: DataTypes.STRING,
    sensor_value: DataTypes.STRING,
    data_type: DataTypes.STRING,
    role_access: DataTypes.ENUM("owner", "admin", "resident"),
    system_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "device" }
);

export default Device;
