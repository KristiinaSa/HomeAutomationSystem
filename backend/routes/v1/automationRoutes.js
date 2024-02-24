import express from "express";
const router = express.Router();

import {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
  getTimerAutomation,
} from "../../controllers/automationController.js";

router.get("/", getAutomations);

router.get("/:id", getAutomation);

// Timer-based automation
router.get("/timer/:id", getTimerAutomation);
router.post("/timer", addAutomation);
router.put("/timer/:id", editAutomation);
router.delete("/timer/:id", deleteAutomation);

// Sensor-based automation
router.get("/sensor/:id", getAutomation);
router.post("/sensor", addAutomation);
router.put("/sensor/:id", editAutomation);
router.delete("/sensor/:id", deleteAutomation);

router.post("/", addAutomation);

router.put("/:id", editAutomation);

router.delete("/:id", deleteAutomation);

export default router;
