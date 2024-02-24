import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

import System from "./systemModel.js";

class Room extends Model {}

Room.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "room" }
);

export default Room;
