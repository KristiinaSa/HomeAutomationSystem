const express = require("express");
const loginController = require("../../controllers/loginController.js");
const router = express.Router();

router.post("/", loginController.login);

router.post("/logout", loginController.logout);

module.exports = router;
