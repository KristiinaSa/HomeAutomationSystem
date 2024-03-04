const express = require("express");
const router = express.Router();

const { addRoom, getRooms } = require("../../controllers/roomController.js");

router.get("/", getRooms);

router.post("/", addRoom);

router.get("/delete-room", (req, res) => {
  res.send("Delete Room");
});

module.exports = router;
