const express = require("express");
const router = express.Router();

const { addRoom, getRooms } = require("../../controllers/roomController.js");
const checkRole = require("../../middleware/checkRole.js");

router.get("/", getRooms);

router.post("/", checkRole, addRoom);

router.get("/delete-room", (req, res) => {
  res.send("Delete Room");
});

module.exports = router;
