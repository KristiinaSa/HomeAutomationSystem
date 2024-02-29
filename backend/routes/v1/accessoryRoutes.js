const express = require("express");
const router = express.Router();

const {
  getAllAccessories,
  getAllDevices,
} = require("../../controllers/accessoryController.js");

router.get("/", getAllAccessories);

router.get("/devices", getAllDevices);

router.get("/add-accessory", (req, res) => {
  res.send("Add Accessory");
});

router.get("/delete-accessory", (req, res) => {
  res.send("Delete Accessory");
});

module.exports = router;
