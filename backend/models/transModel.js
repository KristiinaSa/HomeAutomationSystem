const fs = require("fs");
const path = require("path");
const { Model, DataTypes } = require("sequelize");
const getSequelize = require("../db/db.js");

const sequelize = getSequelize();

class BaseModel extends Model {
  static initModel(tableName, modelName) {
    return this.init(
      {
        key: DataTypes.STRING,
        value: DataTypes.STRING,
        language: DataTypes.STRING,
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: false,
      }
    );
  }
}

const models = {};
const files = fs.readdirSync("./translations");

files.forEach((file) => {
  const modelName = path.basename(file, path.extname(file)) + "_translation";
  const tableName = modelName.toLowerCase();

  const DynamicModel = class extends BaseModel {};
  DynamicModel.initModel(tableName, modelName);

  models[modelName] = DynamicModel;
});

module.exports = models;
