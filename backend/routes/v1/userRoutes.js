import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User");
});

router.get("/invite", (req, res) => {
  res.send("Invite User");
});

router.get("/delete-user", (req, res) => {
  res.send("Delete User");
});

export default router;
