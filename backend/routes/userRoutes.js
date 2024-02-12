const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User");
});

router.get("/change-password", (req, res) => {
  res.send("Change Password");
});

router.get("/delete-user", (req, res) => {
  res.send("Delete User");
});

module.exports = router;
