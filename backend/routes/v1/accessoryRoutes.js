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
  updateDeviceStatus,
} = require("../../controllers/accessoryController.js");

const authenticateToken = require("../../middleware/authToken.js");
const getUserData = require("../../middleware/getUserData.js");
const checkRole = require("../../middleware/checkRole.js");

router.get("/", getAllAccessories);

router.get("/devices", getAllDevices);

router.get("/sensors", getAllSensors);

router.post("/add-device", checkRole, addDevice);

router.delete("/delete-device/:id", checkRole, deleteDevice);

router.post("/toggle/:id", toggleOnOff);

router.get("/room-devices/:id", getRoomDevices);

router.get("/analytics/", getDeviceAnalytics);

router.get("/status/", updateDeviceStatus);

module.exports = router;
