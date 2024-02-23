import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Accessory");
});

router.get("/add-accessory", (req, res) => {
  res.send("Add Accessory");
});

router.get("/delete-accessory", (req, res) => {
  res.send("Delete Accessory");
});

export default router;
