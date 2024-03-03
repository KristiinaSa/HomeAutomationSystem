const express = require("express");
const loginController = require("../../controllers/loginController.js");
const router = express.Router();

router.post("/", loginController.login);

router.post("/logout", loginController.logout);

router.post("/register", loginController.register);

module.exports = router;
