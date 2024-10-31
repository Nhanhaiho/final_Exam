import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

// lat user
router.get("/", getAllUsers);

// tao user
router.get("/:id", getUserById);

export default router;
