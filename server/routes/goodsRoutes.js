import express from "express";
import {
  createGoods,
  getGoods,
  respondToOffer,
  getAllGoods,
  updateGoods,
  deleteGoods,
  getGoodStatus,
  //getOwnedGoods,
  getGoodsInTransport,
} from "../controllers/goodsController.js";
//import upload from "../config/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.post('/', upload.single('goodsImage'), createGoods);
router.post("/", protect, createGoods); //create good
router.put("/accept-offer/:offerId", protect, respondToOffer); //accept or reject offer
router.get("/", protect, getGoods); // get goods of logged in user
router.get("/all", protect, getAllGoods); // get all goods irresptive of the id
router.put("/:id", protect, updateGoods); // update the goods
router.delete("/:id", protect, deleteGoods); // delete the goods
router.get("/:id/status", protect, getGoodStatus); // get good status
// router.get("/owned-goods", protect, getOwnedGoods);
//router.get("/goods/:goodId/status", protect, getGoodStatus);
router.get("/goods-in-transport", protect, getGoodsInTransport); // get details of goods in-transit

export default router;
