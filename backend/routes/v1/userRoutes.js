import {deleteUser, getAllUsers, inviteUser} from "../../controllers/userController.js";
import express from "express";
const router = express.Router();

router.get("/", getAllUsers);

router.post("/invite-user", inviteUser);

router.delete("/delete-user/:id", deleteUser);

export default router;
