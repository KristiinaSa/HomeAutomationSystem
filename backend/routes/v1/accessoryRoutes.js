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
  getDeviceTypes,
} = require("../../controllers/accessoryController.js");

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

router.get("/device-types", getDeviceTypes);

module.exports = router;
