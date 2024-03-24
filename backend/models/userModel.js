const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

const Settings = require("./settingModel.js");
const Language = require("./languageModel.js");

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ["owner", "admin", "resident"],
      defaultValue: "resident",
    },
    password: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    is_registered: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  },
  { sequelize, modelName: "user" }
);

User.afterCreate(async (user, options) => {
  const language = await Language.findOne({ where: { code: "en" } });
  if (!language) throw new Error("Default language not found");

  await Settings.create({
    user_id: user.id,
    language_id: language.id,
  });
});

module.exports = User;
