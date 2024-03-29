const userController = require("../../controllers/userController.js");
const express = require("express");
const router = express.Router();

const {
  deleteUser,
  getAllUsers,
  inviteUser,
  changeRole,
  themeToggler,
  changeLanguage,
} = userController;

const authenticateToken = require("../../middleware/authToken.js");
const getUserData = require("../../middleware/getUserData.js");

router.get("/", getAllUsers);

router.post("/invite-user", inviteUser);

router.delete("/delete-user/:id", deleteUser);

router.patch("/change-role/:id", changeRole);

router.post("/theme", themeToggler);

router.patch("/language", changeLanguage);

module.exports = router;
