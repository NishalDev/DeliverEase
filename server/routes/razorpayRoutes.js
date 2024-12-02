import express from "express";
import { createOrder } from "./razorpay.js"; // Import the createOrder function
const router = express.Router();

router.post("/create-order", async (req, res) => {
  console.log("Request received for /create-order"); // Debug log
  const { amount } = req.body;
  console.log("Amount:", amount); // Debug log

  try {
    const order = await createOrder(amount);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // Debug log
    res.status(500).json({ message: "Failed to create Razorpay order", error });
  }
});

export default router;
