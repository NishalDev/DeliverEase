import {
  registerController,
  loginController,
  switchRole,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.put("/switch-role", protect, switchRole);

export default router;
