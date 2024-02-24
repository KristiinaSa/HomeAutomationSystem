import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    role: DataTypes.ENUM("owner", "admin", "resident"),
    password: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    is_registered: DataTypes.INTEGER,
    system_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "user" }
);

export default User;
