import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
