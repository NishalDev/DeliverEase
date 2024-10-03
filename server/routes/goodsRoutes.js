import express from "express";
import {
  createGoods,
  getGoods,
  getGoodsById,
  updateGoods,
  deleteGoods,
} from "../controllers/goodsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createGoods);
router.get("/", protect, getGoods);
router.get("/:id", protect, getGoodsById);
router.put("/:id", protect, updateGoods);
router.delete("/:id", protect, deleteGoods);

export default router;
