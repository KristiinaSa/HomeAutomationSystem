const express = require("express");
const router = express.Router();

const {
  getLanguages,
  getTranslations,
} = require("../../controllers/languageController.js");

router.get("/", getLanguages);
router.get("/translations", getTranslations);

module.exports = router;
