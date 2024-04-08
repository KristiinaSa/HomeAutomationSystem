const fs = require("fs");
const path = require("path");
const models = require("../models/transModel.js");
const sequelize = require("./sequelizeConnector.js");
const Language = require("../models/languageModel.js");

const files = fs.readdirSync("./translations");

const populateTranslations = async () => {
  for (const file of files) {
    const languageCode = path.basename(file, path.extname(file));
    const modelName =
      languageCode.charAt(0) + languageCode.slice(1) + "_translation";

    const Translation = models[modelName];
    const data = JSON.parse(fs.readFileSync(`./translations/${file}`, "utf8"));

    const { languageName } = data.info;
    const translations = data.translations;

    await Language.findOrCreate({
      where: { code: languageCode },
      defaults: { code: languageCode, name: languageName },
    });

    for (const key in translations) {
      const [instance, created] = await Translation.findOrCreate({
        where: { key, language: languageCode },
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
