import express from "express";
import {
  createGoods,
  getGoods,
  getAllGoods,
  updateGoods,
  deleteGoods,
} from "../controllers/goodsController.js";
//import upload from "../config/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.post('/', upload.single('goodsImage'), createGoods);
router.post("/", protect, createGoods);
router.get("/", protect, getGoods);
router.get("/all", protect, getAllGoods);
router.put("/:id", protect, updateGoods);
router.delete("/:id", protect, deleteGoods);

export default router;
