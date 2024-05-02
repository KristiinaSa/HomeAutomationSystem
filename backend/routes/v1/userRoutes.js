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

const checkRole = require("../../middleware/checkRole.js");

router.get("/", getAllUsers);

router.post("/invite-user", checkRole, inviteUser);

router.delete("/delete-user/:id", checkRole, deleteUser);

router.patch("/change-role/:id", checkRole, changeRole);

router.post("/theme", themeToggler);

router.patch("/language", changeLanguage);

module.exports = router;
