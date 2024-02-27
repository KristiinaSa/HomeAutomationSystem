import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import Settings from "./settingModel.js";

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    role: DataTypes.ENUM("owner", "admin", "resident"),
    password: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    is_registered: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  { sequelize, modelName: "user" }
);

User.afterCreate(async (user, options) => {
  await Settings.create({
    user_id: user.id,
  });
});

export default User;
