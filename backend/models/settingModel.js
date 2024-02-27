import { Model, DataTypes } from "sequelize";
import getSequelize from "../db/db.js";

const sequelize = getSequelize();

class Setting extends Model {}

Setting.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: { type: DataTypes.STRING, defaultValue: "English" },
    using_darkmode: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  { sequelize, modelName: "setting" }
);

export default Setting;
