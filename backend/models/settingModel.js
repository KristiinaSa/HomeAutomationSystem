import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import User from "./userModel.js";

class Setting extends Model {}

Setting.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: DataTypes.STRING,
    using_darkmode: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "setting" }
);

export default Setting;
