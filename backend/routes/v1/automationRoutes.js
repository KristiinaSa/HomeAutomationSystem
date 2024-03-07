const express = require("express");
const router = express.Router();

const {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
  getTimerAutomation,
  addTimerAutomation,
  editTimerAutomation,
  deleteTimerAutomation,
} = require("../../controllers/automationController.js");

const authenticateToken = require("../../middleware/authToken.js");
const getUserData = require("../../middleware/getUserData.js");

router.get("/", getAutomations);

router.get("/:id", getAutomation);

// Timer-based automation
router.get("/timer/:id", authenticateToken, getUserData, getTimerAutomation);
router.post("/timer", authenticateToken, getUserData, addTimerAutomation);
router.put("/timer/:id", authenticateToken, getUserData, editTimerAutomation);
router.delete(
  "/timer/:id",
  authenticateToken,
  getUserData,
  deleteTimerAutomation
);

// Sensor-based automation
router.get("/sensor/:id", getAutomation);
router.post("/sensor", addAutomation);
router.put("/sensor/:id", editAutomation);
router.delete("/sensor/:id", deleteAutomation);

router.post("/", addAutomation);

router.put("/:id", editAutomation);

router.delete("/:id", deleteAutomation);

module.exports = router;
