const express = require("express");
const router = express.Router();

const { sendStatus } = require("../../controllers/statusController.js");

router.get("/", sendStatus);

module.exports = router;
