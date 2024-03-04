const express = require("express");
const router = express.Router();

const { addRoom } = require("../../controllers/roomController.js");

router.get("/", (req, res) => {
  res.send("Room");
});

router.post("/", addRoom);

router.get("/delete-room", (req, res) => {
  res.send("Delete Room");
});

module.exports = router;
