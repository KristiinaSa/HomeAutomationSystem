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

router.get("/", getAutomations);

router.get("/:id", getAutomation);

// Timer-based automation
router.get("/timer/:id", getTimerAutomation);
router.post("/timer", addTimerAutomation);
router.put("/timer/:id", editTimerAutomation);
router.delete("/timer/:id", deleteTimerAutomation);

// Sensor-based automation
router.get("/sensor/:id", getAutomation);
router.post("/sensor", addAutomation);
router.put("/sensor/:id", editAutomation);
router.delete("/sensor/:id", deleteAutomation);

router.post("/", addAutomation);

router.put("/:id", editAutomation);

router.delete("/:id", deleteAutomation);

module.exports = router;
