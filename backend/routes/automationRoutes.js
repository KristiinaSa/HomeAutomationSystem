const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Automation");
});

router.get("/add-automation", (req, res) => {
  res.send("Add Automation");
});

router.get("/delete-automation", (req, res) => {
  res.send("Delete Automation");
});

module.exports = router;
