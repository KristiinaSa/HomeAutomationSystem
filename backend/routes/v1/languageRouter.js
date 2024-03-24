const express = require("express");
const router = express.Router();

const { getLanguages } = require("../../controllers/languageController.js");

router.get("/", getLanguages);

module.exports = router;
