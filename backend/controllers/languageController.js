const Language = require("../models/languageModel.js");
const models = require("../models/transModel.js");

const getLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: "Error getting languages" });
  }
};

const getTranslations = async (req, res, next) => {
  try {
    const { lng } = req.query;
    const modelName = lng + "_translation";
    const Translation = models[modelName];

    if (!Translation) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const translations = await Translation.findAll({
      where: { language: lng },
    });

    const translationsObject = translations.reduce((obj, translation) => {
      obj[translation.key] = translation.value;
      return obj;
    }, {});

    res.json(translationsObject);
  } catch (err) {
    next(err);
  }
};

module.exports = { getLanguages, getTranslations };
