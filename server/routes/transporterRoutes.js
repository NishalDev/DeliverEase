import express from "express";
import {
  getAvailableGoods,
  offerTransport,
  startDelivery,
  completeDelivery,
  getOffersByGoods,
  approveOffer,
  rejectOffer,
  getOfferStatus,
} from "../controllers/transporterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/offers/:goodsId", protect, getOffersByGoods);
router.put("/offer/approve/:transportId", protect, approveOffer);
router.put("/offer/reject/:transportId", protect, rejectOffer);
router.get("/offer-status/:offerId", protect, getOfferStatus);
router.get("/available-goods", protect, getAvailableGoods);
router.post("/offer/:goodsId", protect, offerTransport);
router.put("/start-delivery/:transportId", protect, startDelivery);
router.put("/complete-delivery/:transportId", protect, completeDelivery);

export default router;
