const Language = require("../models/languageModel.js");

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
    const { lng, ns } = req.query;

    const Translation = require(`../models/translations_${lng}.js`);

    const translations = await Translation.findAll({
      where: { namespace: ns },
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

module.exports = { getLanguages };
