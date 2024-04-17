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
const checkRole = require("../../middleware/checkRole.js");

router.get("/", getAutomations);

router.get("/:id", getAutomation);

// Timer-based automation
router.get("/timer/:id", getTimerAutomation);
router.post("/timer", checkRole, addTimerAutomation);
router.put("/timer/:id", checkRole, editTimerAutomation);
router.delete("/timer/:id", checkRole, deleteTimerAutomation);

// Sensor-based automation
router.get("/sensor/:id", getAutomation);
router.post("/sensor", checkRole, addAutomation);
router.put("/sensor/:id", checkRole, editAutomation);
router.delete("/sensor/:id", checkRole, deleteAutomation);

router.post("/", checkRole, addAutomation);

router.put("/:id", checkRole, editAutomation);

router.delete("/:id", checkRole, deleteAutomation);

module.exports = router;
