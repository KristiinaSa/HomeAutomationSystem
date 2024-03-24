const Language = require("../models/languageModel.js");

const getLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: "Error getting languages" });
  }
};

module.exports = { getLanguages };
