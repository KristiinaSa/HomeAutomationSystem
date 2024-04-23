// Adds only the basic required data to setup the database
// Only DeviceTypes, Languages, and Translations
require("./associations.js");
const sequelize = require("./sequelizeConnector.js");
const fs = require("fs");
const path = require("path");
const models = require("../models/transModel.js");
const files = fs.readdirSync("./translations");

const DeviceType = require("../models/deviceTypeModel.js");
const Language = require("../models/languageModel.js");

const addFreshData = async () => {
  await sequelize.sync({ force: true });

  await DeviceType.bulkCreate([
    { name: "light" },
    { name: "tv" },
    { name: "fan" },
  ]);
};

const populateTranslations = async () => {
  try {
    for (const file of files) {
      const languageCode = path.basename(file, path.extname(file));
      const modelName =
        languageCode.charAt(0) + languageCode.slice(1) + "_translation";

      const Translation = models[modelName];
      const data = JSON.parse(
        fs.readFileSync(`./translations/${file}`, "utf8")
      );

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
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  try {
    await addFreshData();
    await populateTranslations();
    console.log("DB succesfully populated with fresh minimal data");
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
};

main().catch(console.error);
