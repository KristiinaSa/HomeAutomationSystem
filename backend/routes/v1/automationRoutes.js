import express from "express";
const router = express.Router();

import {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
} from "../../controllers/automationController.js";

router.get("/", getAutomations);

router.get("/:id", getAutomation);

router.post("/", addAutomation);

router.put("/:id", editAutomation);

router.delete("/:id", deleteAutomation);

export default router;
