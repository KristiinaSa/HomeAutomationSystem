const express = require("express");
const router = express.Router();

const {
  getAllAccessories,
  getAllDevices,
  getAllSensors,
  addDevice,
  deleteDevice,
  toggleOnOff,
  getRoomDevices,
  getDeviceAnalytics,
} = require("../../controllers/accessoryController.js");

const authenticateToken = require("../../middleware/authToken.js");
const getUserData = require("../../middleware/getUserData.js");

router.get("/", getAllAccessories);

router.get("/devices", getAllDevices);

router.get("/sensors", getAllSensors);

router.post("/add-device", addDevice);

router.delete("/delete-device/:id", deleteDevice);

router.post("/toggle/:id", authenticateToken, getUserData, toggleOnOff);

router.get("/room-devices/:id", getRoomDevices);

router.get("/analytics/", getDeviceAnalytics);

module.exports = router;
