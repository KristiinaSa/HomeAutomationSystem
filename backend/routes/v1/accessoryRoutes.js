const express = require("express");
const router = express.Router();

const {
  getAllAccessories,
  getAllDevices,
  getAllSensors,
  addDevice,
  deleteDevice,
  toggleOnOff,
  getDeviceAnalytics,
} = require("../../controllers/accessoryController.js");

router.get("/", getAllAccessories);

router.get("/devices", getAllDevices);

router.get("/sensors", getAllSensors);

router.post("/add-device", addDevice);

router.delete("/delete-device/:id", deleteDevice);

router.post("/toggle/:id", toggleOnOff);

router.get("/analytics/", getDeviceAnalytics);

module.exports = router;
