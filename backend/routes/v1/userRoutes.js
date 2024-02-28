import {deleteUser, getAllUsers, inviteUser, changeRole} from "../../controllers/userController.js";
import express from "express";
const router = express.Router();

router.get("/", getAllUsers);

router.post("/invite-user", inviteUser);

router.delete("/delete-user/:id", deleteUser);

router.patch("/change-role/:id", changeRole);

export default router;
