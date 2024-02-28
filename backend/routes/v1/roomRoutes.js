const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Room");
});

router.get("/add-room", (req, res) => {
  res.send("Add Room");
});

router.get("/delete-room", (req, res) => {
  res.send("Delete Room");
});

module.exports = router;
