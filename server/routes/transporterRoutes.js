import express from "express";
import {
  getAvailableGoods,
  offerTransport,
  startDelivery,
  completeDelivery,
} from "../controllers/transporterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/available-goods", protect, getAvailableGoods);
router.post("/offer/:goodsId", protect, offerTransport);
router.put("/start-delivery/:transportId", protect, startDelivery);
router.put("/complete-delivery/:transportId", protect, completeDelivery);

export default router;
