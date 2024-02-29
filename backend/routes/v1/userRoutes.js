const userController = require("../../controllers/userController.js");
const express = require("express");
const router = express.Router();

const { deleteUser, getAllUsers, inviteUser, changeRole } = userController;

router.get("/", getAllUsers);

router.post("/invite-user", inviteUser);

router.delete("/delete-user/:id", deleteUser);

router.patch("/change-role/:id", changeRole);

module.exports = router;
