const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.get("/automation", (req, res) => {
  res.send("Automation");
});

router.get("/settings", (req, res) => {
  res.send("Settings");
});

module.exports = router;
