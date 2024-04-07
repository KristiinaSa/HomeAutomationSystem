const fs = require("fs");
const path = require("path");
const Translation = require("../models/translationModel.js");
const sequelize = require("./sequelizeConnector.js");

const files = fs.readdirSync("./translations");

const populateTranslations = async () => {
  for (const file of files) {
    const language = path.basename(file, path.extname(file));
    const translations = JSON.parse(
      fs.readFileSync(`./translations/${file}`, "utf8")
    );

    for (const key in translations) {
      const [instance, created] = await Translation.findOrCreate({
        where: { key, language },
        defaults: { value: translations[key] },
      });

      if (!created) {
        await instance.update({ value: translations[key] });
      }
    }
  }

  await sequelize.close();
};

populateTranslations();
