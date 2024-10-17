import express from "express";
import {
  createGoods,
  getGoods,
  respondToOffer,
  getAllGoods,
  updateGoods,
  deleteGoods,
  getGoodStatus,
} from "../controllers/goodsController.js";
//import upload from "../config/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.post('/', upload.single('goodsImage'), createGoods);
router.post("/", protect, createGoods);
router.put("/accept-offer/:offerId", protect, respondToOffer);
router.get("/", protect, getGoods);
router.get("/all", protect, getAllGoods);
router.put("/:id", protect, updateGoods);
router.delete("/:id", protect, deleteGoods);
router.get("/:id/status", protect, getGoodStatus);
export default router;
